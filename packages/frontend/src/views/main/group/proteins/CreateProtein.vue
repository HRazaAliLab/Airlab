<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>Create Protein</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn @click="cancel" text color="primary">Cancel</v-btn>
        <v-btn @click="reset" text color="primary">Reset</v-btn>
        <v-btn @click="submit" text :disabled="!valid" color="primary">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card class="mt-4 px-4">
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field label="Name" v-model="name" :rules="nameRules" />
          <v-text-field label="Description" v-model="description" />
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { required } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";
import { proteinModule } from "@/modules/protein";
import { CreateProteinDto } from "@airlab/shared/lib/protein/dto";
import { groupModule } from "@/modules/group";

@Component
export default class CreateProtein extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly proteinContext = proteinModule.context(this.$store);

  readonly nameRules = [required];

  valid = true;
  name = "";
  description = "";

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  reset() {
    this.name = "";
    this.description = "";
    (this.$refs.form as any).resetValidation();
  }

  cancel() {
    this.$router.back();
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.activeGroupId) {
      const data: CreateProteinDto = {
        groupId: this.activeGroupId,
        name: this.name,
        description: this.description,
      };
      await this.proteinContext.actions.createProtein(data);
      this.$router.back();
    }
  }
}
</script>
