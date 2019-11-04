<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Create Clone</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-combobox label="Protein" v-model="protein" :items="proteins" item-text="name" item-value="id" />
            <v-text-field label="Clone Name" v-model="name" :rules="nameRules" />
            <v-text-field label="Binding Region" v-model="bindingRegion" :rules="bindingRegionRules" />
            <v-text-field label="Isotype" v-model="isotype" :rules="isotypeRules" />
            <v-checkbox label="Polyclonal" v-model="isPolyclonal" />
            <v-checkbox label="Phosphoantibody" v-model="isPhospho" />
            <v-select
              label="Host Species"
              v-model="speciesHost"
              :items="species"
              item-text="name"
              item-value="id"
              :rules="speciesHostRules"
            />
            <div class="subtitle-1">
              Reactivity
            </div>
            <v-chip-group v-model="species" multiple column active-class="primary--text">
              <v-chip v-for="item in species" :key="item" :value="item.id" small>
                {{ item.name }}
              </v-chip>
            </v-chip-group>
            <div class="subtitle-1">
              Applications
            </div>
            <v-checkbox
              v-for="app in applications"
              v-model="application"
              indeterminate
              :label="app.name"
              :value="app.value"
            />
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
import { cloneModule } from "@/modules/clone";
import { CreateCloneDto } from "@airlab/shared/lib/clone/dto";
import { proteinModule } from "@/modules/protein";
import { speciesModule } from "@/modules/species";

@Component
export default class CreateClone extends Vue {
  readonly cloneContext = cloneModule.context(this.$store);
  readonly proteinContext = proteinModule.context(this.$store);
  readonly speciesContext = speciesModule.context(this.$store);

  readonly nameRules = [required];
  readonly bindingRegionRules = [required];
  readonly isotypeRules = [required];
  readonly speciesHostRules = [required];

  readonly applications = [
    {
      name: "sMC",
      value: 0,
    },
    {
      name: "iMC",
      value: 1,
    },
    {
      name: "FC",
      value: 2,
    },
    {
      name: "IF",
      value: 3,
    },
    {
      name: "IHC",
      value: 4,
    },
  ];

  valid = true;
  name = "";
  protein = "";
  bindingRegion = "";
  isotype = "";
  isPolyclonal = false;
  isPhospho = false;
  speciesHost = "";
  reactivity = "";
  application = [];

  get proteins() {
    return this.proteinContext.getters.proteins;
  }

  get species() {
    return this.speciesContext.getters.species;
  }

  reset() {
    this.name = "";
    this.protein = "";
    this.bindingRegion = "";
    this.isotype = "";
    this.isPolyclonal = false;
    this.isPhospho = false;
    this.speciesHost = "";
    this.reactivity = "";
    this.application = [];
    (this.$refs.form as any).resetValidation();
  }

  cancel() {
    this.$router.back();
  }

  async mounted() {
    await this.proteinContext.actions.getAllProteinsForGroup(+this.$router.currentRoute.params.id);
    await this.speciesContext.actions.getSpecies();
  }

  async submit() {
    if ((this.$refs.form as any).validate()) {
      const data: CreateCloneDto = {
        name: this.name,
        proteinId: parseInt(this.protein, 10),
        bindingRegion: this.bindingRegion,
        isotype: this.isotype,
        isPhospho: this.isPhospho,
        isPolyclonal: this.isPolyclonal,
        speciesHost: parseInt(this.speciesHost, 10),
        reactivity: this.reactivity,
        application: this.application,
      };
      await this.cloneContext.actions.createClone(data);
      this.$router.back();
    }
  }
}
</script>
