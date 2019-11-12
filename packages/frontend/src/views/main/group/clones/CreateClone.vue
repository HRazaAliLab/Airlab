<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Create Clone</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
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
import { CreateCloneDto } from "@airlab/shared/lib/clone/dto";
import { proteinModule } from "@/modules/protein";
import { speciesModule } from "@/modules/species";
import { groupModule } from "@/modules/group";

@Component
export default class CreateClone extends Vue {
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
  reactivity = [];
  smcApplication = "undefined";
  imcApplication = "undefined";
  fcApplication = "undefined";
  ifApplication = "undefined";
  ihcApplication = "undefined";

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get proteins() {
    return this.proteinContext.getters.proteins;
  }

  get species() {
    return this.speciesContext.getters.species;
  }

  cancel() {
    this.$router.back();
  }

  reset() {
    this.name = "";
    this.proteinId = null;
    this.epitope = "";
    this.isotype = "";
    this.isPolyclonal = false;
    this.isPhospho = false;
    this.speciesId = null;
    this.reactivity = [];
    this.smcApplication = "undefined";
    this.imcApplication = "undefined";
    this.fcApplication = "undefined";
    this.ifApplication = "undefined";
    this.ihcApplication = "undefined";
    (this.$refs.form as any).resetValidation();
  }

  async mounted() {
    await Promise.all([
      this.proteinContext.actions.getAllProteinsForGroup(+this.$router.currentRoute.params.groupId),
      this.speciesContext.actions.getSpecies(),
    ]);
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.activeGroupId) {
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
      const data: CreateCloneDto = {
        groupId: this.activeGroupId,
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
      await this.cloneContext.actions.createClone(data);
      this.$router.back();
    }
  }
}
</script>
