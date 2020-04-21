<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>
        Edit Tag
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
            <v-text-field label="Name" v-model="name" :rules="nameRules" />
            <v-checkbox label="Metal" v-model="isMetal" />
            <v-checkbox label="Fluorophore" v-model="isFluorophore" />
            <v-checkbox label="Enzyme" v-model="isEnzyme" />
            <v-checkbox label="Biotin" v-model="isBiotin" />
            <v-checkbox label="Other" v-model="isOther" />
            <v-text-field label="Description" v-model="description" />
            <v-text-field v-if="isMetal" label="MW" v-model.number="mw" :rules="mwRules" type="number" />
            <v-text-field
              v-if="isFluorophore"
              label="Emission"
              v-model.number="emission"
              :rules="emissionRules"
              type="number"
            />
            <v-text-field
              v-if="isFluorophore"
              label="Excitation"
              v-model.number="excitation"
              :rules="excitationRules"
              type="number"
            />
          </v-form>
        </template>
      </v-card-text>
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
  readonly mwRules = [];
  readonly emissionRules = [];
  readonly excitationRules = [];

  valid = true;
  name = "";
  isMetal = false;
  isFluorophore = false;
  isEnzyme = false;
  isBiotin = false;
  isOther = false;
  description: string | null = null;
  mw: number | null = null;
  emission: number | null = null;
  excitation: number | null = null;

  get tag() {
    return this.tagContext.getters.getTag(+this.$router.currentRoute.params.id);
  }

  async mounted() {
    await this.tagContext.actions.getTag(+this.$router.currentRoute.params.id);
    this.reset();
  }

  reset() {
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
    if (this.tag) {
      this.name = this.tag.name;
      this.isMetal = this.tag.isMetal;
      this.isFluorophore = this.tag.isFluorophore;
      this.isEnzyme = this.tag.isEnzyme;
      this.isBiotin = this.tag.isBiotin;
      this.isOther = this.tag.isOther;
      this.description = this.tag.description;
      this.mw = this.tag.mw;
      this.emission = this.tag.emission;
      this.excitation = this.tag.excitation;
    }
  }

  cancel() {
    this.$router.back();
  }

  async submit() {
    if ((this.$refs.form as any).validate()) {
      const data: UpdateTagDto = {
        name: this.name,
        isMetal: this.isMetal,
        isFluorophore: this.isFluorophore,
        isEnzyme: this.isEnzyme,
        isBiotin: this.isBiotin,
        isOther: this.isOther,
        description: this.description,
        mw: this.mw,
        emission: this.emission,
        excitation: this.excitation,
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
