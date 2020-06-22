<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="text-h5 primary--text">Edit Group Member</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <div class="text-subtitle-1">
              Role
            </div>
            <v-btn-toggle v-model="role">
              <v-btn small value="100">
                Admin
              </v-btn>
              <v-btn small value="10">
                Standard
              </v-btn>
              <v-btn small value="0">
                Guest
              </v-btn>
            </v-btn-toggle>
            <v-checkbox label="Active" v-model="isActive" hint="Access is permited" />
            <v-row>
              <v-checkbox label="Can access all panels" v-model="allPanels" class="mr-4" />
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
  role = "0";
  isActive = false;
  allPanels = false;

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
      this.role = this.member.role.toString();
      this.isActive = this.member.isActive;
      this.allPanels = this.member.allPanels;
    }
  }

  cancel() {
    this.$router.back();
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.member) {
      const data: UpdateMemberDto = {
        role: !this.role || this.role === "" ? 0 : Number(this.role),
        isActive: this.isActive,
        allPanels: this.allPanels,
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
