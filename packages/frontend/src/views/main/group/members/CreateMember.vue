<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>
        Create Group Member
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn @click="cancel" text color="primary">Cancel</v-btn>
        <v-btn @click="reset" text color="primary">Reset</v-btn>
        <v-btn @click="submit" text :disabled="!valid" color="primary">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card class="mt-4 px-4">
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-autocomplete
              label="User"
              v-model="userId"
              :items="users"
              item-text="name"
              item-value="id"
              :rules="userRules"
              dense
            />
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
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { memberModule } from "@/modules/member";
import { CreateMemberDto } from "@airlab/shared/lib/member/dto";
import { userModule } from "@/modules/user";
import { required } from "@/utils/validators";

@Component
export default class CreateMember extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly userContext = userModule.context(this.$store);
  readonly memberContext = memberModule.context(this.$store);

  readonly userRules = [required];

  valid = true;
  userId: number | null = null;
  role = "";
  isActive = false;
  canOrder = false;
  canErase = false;
  canFinances = false;
  canPanels = false;

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get users() {
    return this.userContext.getters.users.map(item => ({
      id: item.id,
      name: `${item.name} [${item.email}]`,
    }));
  }

  reset() {
    this.userId = null;
    this.role = "";
    this.isActive = false;
    this.canOrder = false;
    this.canErase = false;
    this.canFinances = false;
    this.canPanels = false;
    (this.$refs.form as any).resetValidation();
  }

  cancel() {
    this.$router.back();
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.activeGroupId) {
      const data: CreateMemberDto = {
        groupId: this.activeGroupId,
        userId: Number(this.userId),
        role: !this.role || this.role === "" ? -1 : Number(this.role),
        isActive: this.isActive,
        canOrder: this.canOrder,
        canErase: this.canErase,
        canFinances: this.canFinances,
        canPanels: this.canPanels,
      };
      await this.memberContext.actions.createMember(data);
      this.$router.back();
    }
  }

  async mounted() {
    await this.userContext.actions.getUsers();
  }
}
</script>
