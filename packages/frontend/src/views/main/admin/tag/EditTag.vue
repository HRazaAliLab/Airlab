<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Edit Tag</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field label="Name" v-model="name" :rules="nameRules" />
            <v-text-field label="MW" v-model="mw" :rules="mwRules" />
            <v-checkbox label="Fluorphore" v-model="isFluorphore" />
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
import { UpdateTagDto } from "@airlab/shared/lib/tag/dto";

@Component
export default class EditTag extends Vue {
  readonly tagContext = tagModule.context(this.$store);

  readonly nameRules = [required];
  readonly mwRules = [required];

  valid = true;
  name = "";
  mw = "";
  isFluorphore = false;
  isMetal = false;

  get tag() {
    return this.tagContext.getters.getTag(+this.$router.currentRoute.params.id);
  }

  async mounted() {
    await this.tagContext.actions.getTags();
    this.reset();
  }

  reset() {
    this.name = "";
    this.mw = "";
    this.isFluorphore = false;
    this.isMetal = false;
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
    if (this.tag) {
      this.name = this.tag.name;
      this.mw = this.tag.mw;
      this.isFluorphore = this.tag.isFluorphore;
      this.isMetal = this.tag.isMetal;
    }
  }

  cancel() {
    this.$router.back();
  }

  async submit() {
    if ((this.$refs.form as any).validate()) {
      const data: UpdateTagDto = {
        name: this.name,
        mw: this.mw,
        isFluorphore: this.isFluorphore,
        isMetal: this.isMetal,
      };
      await this.tagContext.actions.updateTag({
        id: this.tag!.id,
        data: data,
      });
      this.$router.back();
    }
  }
}
</script>
