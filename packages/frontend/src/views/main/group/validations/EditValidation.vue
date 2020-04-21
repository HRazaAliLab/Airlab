<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>
        Edit Validation
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
        <v-form v-model="valid" ref="form">
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
    <v-card class="mt-4 px-4">
      <v-card-title primary-title>
        <div class="headline">Validation Files</div>
      </v-card-title>
      <v-card-text>
        <v-list dense>
          <template v-for="(file, index) in validationFiles">
            <v-list-item dense two-line :key="index">
              <v-col cols="3">
                {{ file.id }}
              </v-col>
              <v-col>
                {{ file.name }}
              </v-col>
              <v-col cols="1">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on" fab x-small color="secondary lighten-3" @click.stop="deleteFile(file)">
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </template>
                  <span>Delete file</span>
                </v-tooltip>
              </v-col>
            </v-list-item>
          </template>
        </v-list>
      </v-card-text>
      <v-card-text>
        <v-form>
          <v-file-input v-model="file" label="File upload" show-size />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="upload" :disabled="!file">
          Upload
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { required } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { lotModule } from "@/modules/lot";
import { conjugateModule } from "@/modules/conjugate";
import { validationModule } from "@/modules/validation";
import { cloneModule } from "@/modules/clone";
import { speciesModule } from "@/modules/species";
import { UpdateValidationDto } from "@airlab/shared/lib/validation/dto";
import { antigenRetrievalTypes } from "@/utils/enums";

@Component
export default class EditValidation extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly validationContext = validationModule.context(this.$store);
  private readonly cloneContext = cloneModule.context(this.$store);
  private readonly lotContext = lotModule.context(this.$store);
  private readonly conjugateContext = conjugateModule.context(this.$store);
  private readonly speciesContext = speciesModule.context(this.$store);

  private readonly requiredRules = [required];

  private readonly fixations = [
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

  private valid = false;
  private cloneId: number | null = null;
  private lotId: number | null = null;
  private lotSearchInput = "";
  private conjugateId: number | null = null;
  private conjugateSearchInput = "";
  private speciesId: number | null = null;
  private application = "1";
  private positiveControl: string | null = null;
  private negativeControl: string | null = null;
  private incubationConditions: string | null = null;
  private concentration: string | null = null;
  private concentrationUnit: string | null = null;
  private tissue: string | null = null;
  private fixation: number | null = null;
  private fixationNotes: string | null = null;
  private notes: string | null = null;
  private status = "3";
  private antigenRetrievalType: string | null = null;
  private antigenRetrievalTime: string | null = null;
  private antigenRetrievalTemperature: string | null = null;
  private saponin = "null";
  private saponinConcentration: string | null = null;
  private methanolTreatment = "null";
  private methanolTreatmentConcentration: string | null = null;
  private surfaceStaining = "null";
  private surfaceStainingConcentration: string | null = null;

  private file: File | null = null;

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  private get clones() {
    return this.cloneContext.getters.clones;
  }

  private get lots() {
    let items = this.lotContext.getters.lots;
    if (this.cloneId) {
      items = items.filter((item) => item.cloneId === this.cloneId);
    }
    return items;
  }

  private get conjugates() {
    let items = this.conjugateContext.getters.conjugates;
    if (this.lotId) {
      items = items.filter((item) => item.lotId === this.lotId);
    }
    return items;
  }

  private get species() {
    return this.speciesContext.getters.species;
  }

  private get validation() {
    return this.validationContext.getters.getValidation(+this.$router.currentRoute.params.id);
  }

  private get validationFiles() {
    return this.validation && (this.validation as any).validationFiles ? (this.validation as any).validationFiles : [];
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

  private cancel() {
    this.$router.back();
  }

  private reset() {
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
    if (this.validation) {
      this.cloneId = (this.validation as any).clone.id;
      this.lotId = (this.validation as any).lot ? (this.validation as any).lot.id : null;
      this.conjugateId = (this.validation as any).conjugate ? (this.validation as any).conjugate.id : null;
      this.speciesId = this.validation.speciesId;
      this.application = this.validation.application.toString();
      this.positiveControl = this.validation.positiveControl;
      this.negativeControl = this.validation.negativeControl;
      this.incubationConditions = this.validation.incubationConditions;
      this.concentration = this.validation.concentration;
      this.concentrationUnit = this.validation.concentrationUnit;
      this.tissue = this.validation.tissue;
      this.fixation = this.validation.fixation;
      this.fixationNotes = this.validation.fixationNotes;
      this.notes = this.validation.notes;
      this.status = this.validation.status.toString();
      this.antigenRetrievalType = this.validation.antigenRetrievalType;
      this.antigenRetrievalTime = this.validation.antigenRetrievalTime;
      this.antigenRetrievalTemperature = this.validation.antigenRetrievalTemperature;
      this.saponin = this.validation.saponin === true ? "true" : this.validation.saponin === false ? "false" : "null";
      this.saponinConcentration = this.validation.saponinConcentration;
      this.methanolTreatment =
        this.validation.methanolTreatment === true
          ? "true"
          : this.validation.methanolTreatment === false
          ? "false"
          : "null";
      this.methanolTreatmentConcentration = this.validation.methanolTreatmentConcentration;
      this.surfaceStaining =
        this.validation.surfaceStaining === true
          ? "true"
          : this.validation.surfaceStaining === false
          ? "false"
          : "null";
      this.surfaceStainingConcentration = this.validation.surfaceStainingConcentration;
    }
  }

  private async submit() {
    if ((this.$refs.form as any).validate() && this.validation && this.cloneId) {
      const data: UpdateValidationDto = {
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
      await this.validationContext.actions.updateValidation({
        id: this.validation.id,
        data: data,
      });
      this.$router.back();
    }
  }

  private async upload() {
    if (this.activeGroupId && this.validation && this.file) {
      const formData = new FormData();
      formData.append("groupId", this.activeGroupId.toString());
      formData.append("file", this.file);
      await this.validationContext.actions.uploadValidationFile({
        validationId: this.validation.id,
        formData: formData,
      });
      await this.validationContext.actions.getValidation(+this.$router.currentRoute.params.id);
      this.file = null;
    }
  }

  private async deleteFile(file) {
    if (self.confirm("Are you sure you want to delete the validation file?")) {
      await this.validationContext.actions.deleteValidationFile(file.id);
      await this.validationContext.actions.getValidation(+this.$router.currentRoute.params.id);
    }
  }

  async mounted() {
    await Promise.all([
      this.validationContext.actions.getValidation(+this.$router.currentRoute.params.id),
      this.cloneContext.actions.getGroupClones(+this.$router.currentRoute.params.groupId),
      this.lotContext.actions.getGroupLots(+this.$router.currentRoute.params.groupId),
      this.conjugateContext.actions.getGroupConjugates(+this.$router.currentRoute.params.groupId),
      this.speciesContext.actions.getGroupSpecies(+this.$router.currentRoute.params.groupId),
    ]);
    this.reset();
  }
}
</script>
