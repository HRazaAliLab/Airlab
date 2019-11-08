<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Create Tag</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field label="Name" v-model="name" :rules="nameRules" />
            <v-text-field label="MW" v-model="mw" :rules="mwRules" />
            <v-checkbox label="Fluorophore" v-model="isFluorophore" />
            <v-checkbox label="Metal" v-model="isMetal" />
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
import { required } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";
import { tagModule } from "@/modules/tag";
import { CreateTagDto } from "@airlab/shared/lib/tag/dto";

@Component
export default class CreateTag extends Vue {
  readonly tagContext = tagModule.context(this.$store);

  readonly nameRules = [required];
  readonly mwRules = [required];

  valid = true;
  name = "";
  mw = "";
  isFluorophore = false;
  isMetal = false;

  reset() {
    this.name = "";
    this.mw = "";
    this.isFluorophore = false;
    this.isMetal = false;
    (this.$refs.form as any).resetValidation();
  }

  cancel() {
    this.$router.back();
  }

  async submit() {
    if ((this.$refs.form as any).validate()) {
      const data: CreateTagDto = {
        name: this.name,
        mw: this.mw,
        isFluorophore: this.isFluorophore,
        isMetal: this.isMetal,
      };
      await this.tagContext.actions.createTag(data);
      this.$router.back();
    }
  }
}
</script>
