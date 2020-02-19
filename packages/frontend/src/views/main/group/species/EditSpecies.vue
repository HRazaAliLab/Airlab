<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>
        Edit Species
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
            <v-text-field label="Acronym" v-model="acronym" :rules="acronymRules" />
          </v-form>
        </template>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { required } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";
import { speciesModule } from "@/modules/species";
import { UpdateSpeciesDto } from "@airlab/shared/lib/species/dto";

@Component
export default class EditSpecies extends Vue {
  readonly speciesContext = speciesModule.context(this.$store);

  readonly nameRules = [required];
  readonly acronymRules = [required];

  valid = true;
  name = "";
  acronym = "";

  get tag() {
    return this.speciesContext.getters.getSpecies(+this.$router.currentRoute.params.id);
  }

  async mounted() {
    await this.speciesContext.actions.getSpecies(+this.$router.currentRoute.params.id);
    this.reset();
  }

  reset() {
    this.name = "";
    this.acronym = "";
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
    if (this.tag) {
      this.name = this.tag.name;
      this.acronym = this.tag.acronym;
    }
  }

  cancel() {
    this.$router.back();
  }

  async submit() {
    if ((this.$refs.form as any).validate()) {
      const data: UpdateSpeciesDto = {
        name: this.name,
        acronym: this.acronym,
      };
      await this.speciesContext.actions.updateSpecies({
        id: this.tag!.id,
        data: data,
      });
      this.$router.back();
    }
  }
}
</script>
