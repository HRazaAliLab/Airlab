<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Create Panel</div>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field label="Name" v-model="name" :rules="nameRules" />
          <v-text-field label="Description" v-model="description" :rules="descriptionRules" />
          <v-text-field label="Application" v-model="application" :rules="applicationRules" />
          <v-checkbox label="Fluor" v-model="isFluor" />
          <v-checkbox label="Production" v-model="isProduction" />
        </v-form>
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
import { required } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { panelModule } from "@/modules/panel";
import { CreatePanelDto } from "@airlab/shared/lib/panel/dto";

@Component
export default class CreatePanel extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly panelContext = panelModule.context(this.$store);

  readonly nameRules = [required];
  readonly descriptionRules = [];
  readonly applicationRules = [required];

  valid = false;
  name = "";
  description = "";
  application: number | null = null;
  isFluor = false;
  isProduction = false;

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  cancel() {
    this.$router.back();
  }

  reset() {
    this.name = "";
    this.description = "";
    this.application = null;
    this.isFluor = false;
    this.isProduction = false;
    (this.$refs.form as any).resetValidation();
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.activeGroupId) {
      const data: CreatePanelDto = {
        groupId: this.activeGroupId,
        name: this.name,
        description: this.description,
        application: this.application,
        isFluor: this.isFluor,
        isProduction: this.isProduction,
      };
      await this.panelContext.actions.createPanel(data);
      this.$router.back();
    }
  }
}
</script>
