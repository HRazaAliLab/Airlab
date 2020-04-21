<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>
        Create Validation
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
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-row>
            <v-col>
              <div class="subtitle-1">
                Application
              </div>
              <v-btn-toggle v-model="application" mandatory>
                <v-btn small value="0">
                  SMC
                </v-btn>
                <v-btn small value="1">
                  IMC
                </v-btn>
                <v-btn small value="2">
                  FC
                </v-btn>
                <v-btn small value="3">
                  IF
                </v-btn>
                <v-btn small value="4">
                  IHC
                </v-btn>
                <v-btn small value="5">
                  IHCF
                </v-btn>
                <v-btn small value="6">
                  WB
                </v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col>
              <div class="subtitle-1">
                Status
              </div>
              <v-btn-toggle v-model="status" mandatory>
                <v-btn small value="0">
                  Yes
                </v-btn>
                <v-btn small value="1">
                  So-So
                </v-btn>
                <v-btn small value="2">
                  No
                </v-btn>
                <v-btn small value="3">
                  Undefined
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete
                label="Clone"
                v-model="cloneId"
                :items="clones"
                item-text="name"
                item-value="id"
                :rules="requiredRules"
                dense
                @change="resetLotId()"
              />
            </v-col>
            <v-col>
              <v-autocomplete
                label="Lot"
                v-model="lotId"
                :search-input.sync="lotSearchInput"
                :items="lots"
                item-text="name"
                item-value="id"
                clearable
                open-on-clear
                dense
                @change="resetConjugateId()"
              />
            </v-col>
            <v-col>
              <v-autocomplete
                label="Conjugate"
                v-model="conjugateId"
                :search-input.sync="conjugateSearchInput"
                :items="conjugates"
                item-text="tubeNumber"
                item-value="id"
                clearable
                open-on-clear
                dense
              />
            </v-col>
          </v-row>
          <v-autocomplete
            label="Species"
            v-model="speciesId"
            :items="species"
            item-text="name"
            item-value="id"
            clearable
            open-on-clear
            dense
          />
          <v-row>
            <v-col>
              <v-text-field label="Positive control" v-model="positiveControl" :rules="requiredRules" />
            </v-col>
            <v-col>
              <v-text-field label="Negative control" v-model="negativeControl" :rules="requiredRules" />
            </v-col>
          </v-row>
          <v-text-field label="Incubation conditions" v-model="incubationConditions" hint="e.g. Overnight, 4°C" />
          <v-text-field label="Tissue" v-model="tissue" hint="e.g. Liver, Lymph node" />
          <v-row>
            <v-col>
              <v-text-field
                label="Concentration"
                v-model="concentration"
                dense
                hint="e.g. 1:100 if dilution or 0.2 if ug/mL"
              />
            </v-col>
            <v-col>
              <v-select
                label="Units"
                v-model="concentrationUnit"
                :items="['dilution', 'ug/mL']"
                clearable
                open-on-clear
                dense
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                label="Fixation"
                v-model="fixation"
                :items="fixations"
                item-value="id"
                item-text="name"
                clearable
                open-on-clear
                dense
              />
            </v-col>
            <v-col>
              <v-text-field label="Fixation notes" v-model="fixationNotes" dense />
            </v-col>
          </v-row>
          <v-text-field label="Notes" v-model="notes" />
          <v-row v-if="application === '1' || application === '3' || application === '4'">
            <v-col>
              <v-select
                label="Antigen retrieval"
                v-model="antigenRetrievalType"
                :items="antigenRetrievalTypes"
                clearable
                open-on-clear
                dense
              />
            </v-col>
            <v-col>
              <v-text-field label="Time" v-model="antigenRetrievalTime" dense hint="minutes" />
            </v-col>
            <v-col>
              <v-text-field label="Temperature" v-model="antigenRetrievalTemperature" dense hint="°C" />
            </v-col>
          </v-row>
          <div v-else>
            <v-row>
              <v-col cols="2">Saponin</v-col>
              <v-col cols="3">
                <v-btn-toggle v-model="saponin" mandatory>
                  <v-btn small value="true">
                    Yes
                  </v-btn>
                  <v-btn small value="false">
                    No
                  </v-btn>
                  <v-btn small value="null">
                    Not tested
                  </v-btn>
                </v-btn-toggle>
              </v-col>
              <v-col>
                <v-text-field label="Concentration" v-model="saponinConcentration" dense hint="ug/mL" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">Methanol treatment</v-col>
              <v-col cols="3">
                <v-btn-toggle v-model="methanolTreatment" mandatory>
                  <v-btn small value="true">
                    Yes
                  </v-btn>
                  <v-btn small value="false">
                    No
                  </v-btn>
                  <v-btn small value="null">
                    Not tested
                  </v-btn>
                </v-btn-toggle>
              </v-col>
              <v-col>
                <v-text-field label="Concentration" v-model="methanolTreatmentConcentration" dense hint="ug/mL" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">Surface staining</v-col>
              <v-col cols="3">
                <v-btn-toggle v-model="surfaceStaining" mandatory>
                  <v-btn small value="true">
                    Yes
                  </v-btn>
                  <v-btn small value="false">
                    No
                  </v-btn>
                  <v-btn small value="null">
                    Not tested
                  </v-btn>
                </v-btn-toggle>
              </v-col>
              <v-col>
                <v-text-field label="Concentration" v-model="surfaceStainingConcentration" dense hint="ug/mL" />
              </v-col>
            </v-row>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { required } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";
import { lotModule } from "@/modules/lot";
import { conjugateModule } from "@/modules/conjugate";
import { groupModule } from "@/modules/group";
import { cloneModule } from "@/modules/clone";
import { speciesModule } from "@/modules/species";
import { CreateValidationDto } from "@airlab/shared/lib/validation/dto";
import { validationModule } from "@/modules/validation";
import { antigenRetrievalTypes } from "@/utils/enums";

@Component
export default class CreateValidation extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly validationContext = validationModule.context(this.$store);
  readonly cloneContext = cloneModule.context(this.$store);
  readonly lotContext = lotModule.context(this.$store);
  readonly conjugateContext = conjugateModule.context(this.$store);
  readonly speciesContext = speciesModule.context(this.$store);

  readonly requiredRules = [required];

  readonly fixations = [
    { id: 0, name: "FFPE" },
    { id: 1, name: "OCT" },
    { id: 2, name: "Bouin" },
    { id: 3, name: "Zinc" },
    { id: 4, name: "Methanol" },
    { id: 5, name: "Saccomano's" },
    { id: 6, name: "Methanol/Acetone" },
    { id: 7, name: "Other" },
  ];
  private readonly antigenRetrievalTypes = antigenRetrievalTypes;

  valid = false;
  cloneId: number | null = null;
  lotId: number | null = null;
  private lotSearchInput = "";
  conjugateId: number | null = null;
  private conjugateSearchInput = "";
  speciesId: number | null = null;
  application = "1";
  positiveControl: string | null = null;
  negativeControl: string | null = null;
  incubationConditions: string | null = null;
  concentration: string | null = null;
  concentrationUnit: string | null = null;
  tissue: string | null = null;
  fixation: number | null = null;
  fixationNotes: string | null = null;
  notes: string | null = null;
  status = "3";
  antigenRetrievalType: string | null = null;
  antigenRetrievalTime: string | null = null;
  antigenRetrievalTemperature: string | null = null;
  saponin = "null";
  saponinConcentration: string | null = null;
  methanolTreatment = "null";
  methanolTreatmentConcentration: string | null = null;
  surfaceStaining = "null";
  surfaceStainingConcentration: string | null = null;

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get clones() {
    return this.cloneContext.getters.clones;
  }

  get lots() {
    let items = this.lotContext.getters.lots;
    if (this.cloneId) {
      items = items.filter((item) => item.cloneId === this.cloneId);
    }
    return items;
  }

  get conjugates() {
    let items = this.conjugateContext.getters.conjugates;
    if (this.lotId) {
      items = items.filter((item) => item.lotId === this.lotId);
    }
    return items;
  }

  get species() {
    return this.speciesContext.getters.species;
  }

  private resetLotId() {
    this.lotId = null;
    this.lotSearchInput = "";
    this.conjugateId = null;
    this.conjugateSearchInput = "";
  }

  private resetConjugateId() {
    this.conjugateId = null;
    this.conjugateSearchInput = "";
  }

  cancel() {
    this.$router.back();
  }

  reset() {
    this.cloneId = this.$router.currentRoute.params.cloneId ? +this.$router.currentRoute.params.cloneId : null;
    this.lotId = this.$router.currentRoute.params.lotId ? +this.$router.currentRoute.params.lotId : null;
    this.lotSearchInput = "";
    this.conjugateId = null;
    this.conjugateSearchInput = "";
    this.speciesId = null;
    this.application = "1";
    this.positiveControl = null;
    this.negativeControl = null;
    this.incubationConditions = null;
    this.concentration = null;
    this.concentrationUnit = null;
    this.tissue = null;
    this.fixation = null;
    this.fixationNotes = null;
    this.notes = null;
    this.status = "3";
    this.antigenRetrievalType = null;
    this.antigenRetrievalTime = null;
    this.antigenRetrievalTemperature = null;
    this.saponin = "null";
    this.saponinConcentration = null;
    this.methanolTreatment = "null";
    this.methanolTreatmentConcentration = null;
    this.surfaceStaining = "null";
    this.surfaceStainingConcentration = null;
    (this.$refs.form as any).resetValidation();
  }

  async mounted() {
    this.reset();
    await Promise.all([
      this.cloneContext.actions.getGroupClones(+this.$router.currentRoute.params.groupId),
      this.lotContext.actions.getGroupLots(+this.$router.currentRoute.params.groupId),
      this.conjugateContext.actions.getGroupConjugates(+this.$router.currentRoute.params.groupId),
      this.speciesContext.actions.getGroupSpecies(+this.$router.currentRoute.params.groupId),
    ]);
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.activeGroupId && this.cloneId) {
      const data: CreateValidationDto = {
        groupId: this.activeGroupId,
        cloneId: this.cloneId,
        lotId: this.lotId ? this.lotId : null,
        conjugateId: this.conjugateId ? this.conjugateId : null,
        speciesId: this.speciesId ? this.speciesId : null,
        application: Number(this.application),
        positiveControl: this.positiveControl,
        negativeControl: this.negativeControl,
        incubationConditions: this.incubationConditions,
        concentration: this.concentration,
        concentrationUnit: this.concentrationUnit,
        tissue: this.tissue,
        fixation: Number(this.fixation),
        fixationNotes: this.fixationNotes,
        notes: this.notes,
        status: Number(this.status),
        antigenRetrievalType: this.antigenRetrievalType,
        antigenRetrievalTime: this.antigenRetrievalTime,
        antigenRetrievalTemperature: this.antigenRetrievalTemperature,
        saponin: this.saponin === "yes" ? true : this.saponin === "false" ? false : null,
        saponinConcentration: this.saponinConcentration,
        methanolTreatment: this.methanolTreatment === "yes" ? true : this.methanolTreatment === "false" ? false : null,
        methanolTreatmentConcentration: this.methanolTreatmentConcentration,
        surfaceStaining: this.surfaceStaining === "yes" ? true : this.surfaceStaining === "false" ? false : null,
        surfaceStainingConcentration: this.surfaceStainingConcentration,
      };
      await this.validationContext.actions.createValidation(data);
      this.$router.back();
    }
  }
}
</script>
