<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Edit Species</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field label="Name" v-model="name" :rules="nameRules" />
            <v-text-field label="Acronym" v-model="acronym" :rules="acronymRules" />
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
    await this.speciesContext.actions.getSpecies();
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
