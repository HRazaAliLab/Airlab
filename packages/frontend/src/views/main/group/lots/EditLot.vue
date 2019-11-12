<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Edit Lot</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form">
            <v-select
              label="Protein"
              v-model="proteinId"
              :items="proteins"
              item-text="name"
              item-value="id"
              :rules="proteinRules"
              dense
            />
            <v-text-field label="Clone Name" v-model="name" :rules="nameRules" />
            <v-text-field label="Epitope" v-model="epitope" :rules="epitopeRules" />
            <v-text-field label="Isotype" v-model="isotype" :rules="isotypeRules" />
            <v-checkbox label="Polyclonal" v-model="isPolyclonal" />
            <v-checkbox label="Phosphoantibody" v-model="isPhospho" />
            <v-select
              label="Host"
              v-model="speciesId"
              :items="species"
              item-text="name"
              item-value="id"
              :rules="hostRules"
              dense
            />
            <v-row>
              <v-col>
                <div class="subtitle-1">
                  Reactivity
                </div>
                <v-chip-group v-model="reactivity" multiple column active-class="primary--text">
                  <v-chip v-for="item in species" :key="item.id" :value="item.id" small>
                    {{ item.name }}
                  </v-chip>
                </v-chip-group>
              </v-col>
              <v-col></v-col>
              <v-col>
                <div class="subtitle-1">
                  Application
                </div>
                <div class="subtitle-3">
                  sMC
                </div>
                <v-btn-toggle v-model="smcApplication">
                  <v-btn small value="true">
                    <v-icon small>mdi-checkbox-marked-outline</v-icon>
                  </v-btn>
                  <v-btn small value="false">
                    <v-icon small>mdi-checkbox-blank-outline</v-icon>
                  </v-btn>
                  <v-btn small value="undefined">
                    <v-icon small>mdi-minus-box-outline</v-icon>
                  </v-btn>
                </v-btn-toggle>
                <div class="subtitle-3">
                  iMC
                </div>
                <v-btn-toggle v-model="imcApplication">
                  <v-btn small value="true">
                    <v-icon small>mdi-checkbox-marked-outline</v-icon>
                  </v-btn>
                  <v-btn small value="false">
                    <v-icon small>mdi-checkbox-blank-outline</v-icon>
                  </v-btn>
                  <v-btn small value="undefined">
                    <v-icon small>mdi-minus-box-outline</v-icon>
                  </v-btn>
                </v-btn-toggle>
                <div class="subtitle-3">
                  FC
                </div>
                <v-btn-toggle v-model="fcApplication">
                  <v-btn small value="true">
                    <v-icon small>mdi-checkbox-marked-outline</v-icon>
                  </v-btn>
                  <v-btn small value="false">
                    <v-icon small>mdi-checkbox-blank-outline</v-icon>
                  </v-btn>
                  <v-btn small value="undefined">
                    <v-icon small>mdi-minus-box-outline</v-icon>
                  </v-btn>
                </v-btn-toggle>
                <div class="subtitle-3">
                  IF
                </div>
                <v-btn-toggle v-model="ifApplication">
                  <v-btn small value="true">
                    <v-icon small>mdi-checkbox-marked-outline</v-icon>
                  </v-btn>
                  <v-btn small value="false">
                    <v-icon small>mdi-checkbox-blank-outline</v-icon>
                  </v-btn>
                  <v-btn small value="undefined">
                    <v-icon small>mdi-minus-box-outline</v-icon>
                  </v-btn>
                </v-btn-toggle>
                <div class="subtitle-3">
                  IHC
                </div>
                <v-btn-toggle v-model="ihcApplication">
                  <v-btn small value="true">
                    <v-icon small>mdi-checkbox-marked-outline</v-icon>
                  </v-btn>
                  <v-btn small value="false">
                    <v-icon small>mdi-checkbox-blank-outline</v-icon>
                  </v-btn>
                  <v-btn small value="undefined">
                    <v-icon small>mdi-minus-box-outline</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </v-col>
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
import { required } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";
import { cloneModule } from "@/modules/clone";
import { proteinModule } from "@/modules/protein";
import { speciesModule } from "@/modules/species";
import { groupModule } from "@/modules/group";
import { UpdateCloneDto } from "@airlab/shared/lib/clone/dto";

@Component
export default class EditLot extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly cloneContext = cloneModule.context(this.$store);
  readonly proteinContext = proteinModule.context(this.$store);
  readonly speciesContext = speciesModule.context(this.$store);

  readonly nameRules = [required];
  readonly proteinRules = [required];
  readonly epitopeRules = [required];
  readonly isotypeRules = [required];
  readonly hostRules = [required];

  readonly applicationMap = {
    sMC: 0,
    iMC: 1,
    FC: 2,
    IF: 3,
    IHC: 4,
  };

  valid = false;
  name = "";
  proteinId: number | null = null;
  epitope = "";
  isotype = "";
  isPolyclonal = false;
  isPhospho = false;
  speciesId: number | null = null;
  reactivity: number[] = [];
  smcApplication = "undefined";
  imcApplication = "undefined";
  fcApplication = "undefined";
  ifApplication = "undefined";
  ihcApplication = "undefined";

  get proteins() {
    return this.proteinContext.getters.proteins;
  }

  get species() {
    return this.speciesContext.getters.species;
  }

  get clone() {
    return this.cloneContext.getters.getClone(+this.$router.currentRoute.params.id);
  }

  cancel() {
    this.$router.back();
  }

  reset() {
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
    if (this.clone) {
      this.name = this.clone.name;
      this.proteinId = this.clone.proteinId;
      this.epitope = this.clone.epitope;
      this.isotype = this.clone.isotype;
      this.isPolyclonal = this.clone.isPolyclonal;
      this.isPhospho = this.clone.isPhospho;
      this.speciesId = this.clone.speciesId;
      this.reactivity = this.clone.reactivity;
      if (this.clone.application.hasOwnProperty(this.applicationMap.sMC)) {
        this.smcApplication = this.clone.application[this.applicationMap.sMC].toString();
      }
      if (this.clone.application.hasOwnProperty(this.applicationMap.iMC)) {
        this.imcApplication = this.clone.application[this.applicationMap.iMC].toString();
      }
      if (this.clone.application.hasOwnProperty(this.applicationMap.FC)) {
        this.fcApplication = this.clone.application[this.applicationMap.FC].toString();
      }
      if (this.clone.application.hasOwnProperty(this.applicationMap.IF)) {
        this.ifApplication = this.clone.application[this.applicationMap.IF].toString();
      }
      if (this.clone.application.hasOwnProperty(this.applicationMap.IHC)) {
        this.ihcApplication = this.clone.application[this.applicationMap.IHC].toString();
      }
    }
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.clone) {
      const application = {};
      if (this.smcApplication !== "undefined") {
        application[this.applicationMap.sMC] = this.smcApplication === "true";
      }
      if (this.imcApplication !== "undefined") {
        application[this.applicationMap.iMC] = this.imcApplication === "true";
      }
      if (this.fcApplication !== "undefined") {
        application[this.applicationMap.FC] = this.fcApplication === "true";
      }
      if (this.ifApplication !== "undefined") {
        application[this.applicationMap.IF] = this.ifApplication === "true";
      }
      if (this.ihcApplication !== "undefined") {
        application[this.applicationMap.IHC] = this.ihcApplication === "true";
      }
      const data: UpdateCloneDto = {
        name: this.name,
        proteinId: Number(this.proteinId),
        epitope: this.epitope,
        isotype: this.isotype,
        isPhospho: this.isPhospho,
        isPolyclonal: this.isPolyclonal,
        speciesId: Number(this.speciesId),
        reactivity: this.reactivity,
        application: application,
      };
      await this.cloneContext.actions.updateClone({
        id: this.clone.id,
        data: data,
      });
      this.$router.back();
    }
  }

  async mounted() {
    await Promise.all([
      this.cloneContext.actions.getClone(+this.$router.currentRoute.params.id),
      this.proteinContext.actions.getAllProteinsForGroup(+this.$router.currentRoute.params.groupId),
      this.speciesContext.actions.getSpecies(),
    ]);
    this.reset();
  }
}
</script>
