<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Edit Group Member</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <div class="subtitle-1">
              Role
            </div>
            <v-btn-toggle v-model="role">
              <v-btn small value="0">
                PI
              </v-btn>
              <v-btn small value="1">
                Manager
              </v-btn>
              <v-btn small value="2">
                Postdoc
              </v-btn>
              <v-btn small value="3">
                Ph.D. Student
              </v-btn>
              <v-btn small value="4">
                Visiting
              </v-btn>
              <v-btn small value="5">
                Other
              </v-btn>
            </v-btn-toggle>
            <v-checkbox label="Active" v-model="isActive" hint="Access is permited" />
            <v-row>
              <v-checkbox label="Orders" v-model="canOrder" class="mx-4" />
              <v-checkbox label="Erase" v-model="canErase" class="mr-4" />
              <v-checkbox label="Finances" v-model="canFinances" class="mr-4" />
              <v-checkbox label="Panels" v-model="canPanels" class="mr-4" />
            </v-row>
          </v-form>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn @click="reset">Reset</v-btn>
        <v-btn @click="submit" :disabled="!valid">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { memberModule } from "@/modules/member";
import { UpdateMemberDto } from "@airlab/shared/lib/member/dto";

@Component
export default class EditMember extends Vue {
  readonly memberContext = memberModule.context(this.$store);

  valid = true;
  role = "";
  isActive = false;
  canOrder = false;
  canErase = false;
  canFinances = false;
  canPanels = false;

  get member() {
    return this.memberContext.getters.getMember(+this.$router.currentRoute.params.id);
  }

  async mounted() {
    await this.memberContext.actions.getMember(+this.$router.currentRoute.params.id);
    this.reset();
  }

  reset() {
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
    if (this.member) {
      this.role = this.member.role === -1 ? "" : this.member.role.toString();
      this.isActive = this.member.isActive;
      this.canOrder = this.member.canOrder;
      this.canErase = this.member.canErase;
      this.canFinances = this.member.canFinances;
      this.canPanels = this.member.canPanels;
    }
  }

  cancel() {
    this.$router.back();
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.member) {
      const data: UpdateMemberDto = {
        role: !this.role || this.role === "" ? -1 : Number(this.role),
        isActive: this.isActive,
        canOrder: this.canOrder,
        canErase: this.canErase,
        canFinances: this.canFinances,
        canPanels: this.canPanels,
      };
      await this.memberContext.actions.updateMember({
        id: this.member.id,
        data: data,
      });
      this.$router.back();
    }
  }
}
</script>
