<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Edit Panel</div>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-text-field label="Name" v-model="name" :rules="nameRules" />
          <v-text-field label="Description" v-model="description" :rules="descriptionRules" />
          <div class="subtitle-1">
            Application
          </div>
          <v-btn-toggle v-model="application">
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
          </v-btn-toggle>
          <v-checkbox label="Fluor" v-model="isFluor" />
          <v-checkbox label="Production" v-model="isProduction" />
          <v-expansion-panels v-model="expanded" multiple>
            <MetalExpansionPanel
              v-for="metal in metals"
              :key="metal.id"
              :tag="metal"
              :onSelected="congugateSelected"
              :initialSelectedConjugate="
                tagConjugates.has(metal.id) ? getConjugate(tagConjugates.get(metal.id)) : undefined
              "
            />
          </v-expansion-panels>
        </v-form>
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
import { groupModule } from "@/modules/group";
import { panelModule } from "@/modules/panel";
import { UpdatePanelDto } from "@airlab/shared/lib/panel/dto";
import MetalExpansionPanel from "@/views/main/group/panels/MetalExpansionPanel.vue";
import { conjugateModule } from "@/modules/conjugate";
import { tagModule } from "@/modules/tag";

@Component({
  components: { MetalExpansionPanel },
})
export default class EditPanel extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly panelContext = panelModule.context(this.$store);
  readonly conjugateContext = conjugateModule.context(this.$store);
  readonly tagContext = tagModule.context(this.$store);

  readonly nameRules = [required];
  readonly descriptionRules = [];
  readonly applicationRules = [];

  valid = false;
  name = "";
  description = "";
  application: number | null = null;
  isFluor = false;
  isProduction = false;
  tagConjugates = new Map<number, number>();

  expanded = []; // this.metals.map((k, i) => i);

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get conjugates() {
    return this.conjugateContext.getters.conjugates;
  }

  getConjugate(id: number) {
    return this.conjugateContext.getters.getConjugate(id);
  }

  get metals() {
    return this.tagContext.getters.metals;
  }

  get panel() {
    return this.panelContext.getters.getPanel(+this.$router.currentRoute.params.id);
  }

  congugateSelected(tagId: number, conjugateId?: number) {
    if (conjugateId !== undefined) {
      this.tagConjugates.set(tagId, conjugateId);
    } else {
      this.tagConjugates.delete(tagId);
    }
  }

  cancel() {
    this.$router.back();
  }

  reset() {
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
    if (this.panel) {
      this.name = this.panel.name;
      this.description = this.panel.description;
      this.application = this.panel.application;
      this.isFluor = this.panel.isFluor;
      this.isProduction = this.panel.isProduction;
      this.tagConjugates = new Map<number, number>();
      if (this.panel.details) {
        for (const item of this.panel.details) {
          const conjugateId = Number(item["plaLabeledAntibodyId"]);
          const conjugate = this.conjugateContext.getters.getConjugate(conjugateId);
          this.tagConjugates.set(conjugate.tagId, conjugateId);
        }
      }
    }
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.panel) {
      const details: any[] = [];
      this.tagConjugates.forEach((item, key, map) => {
        details.push({
          plaLabeledAntibodyId: item,
          plaActualConc: undefined,
        });
      });
      const data: UpdatePanelDto = {
        name: this.name,
        description: this.description,
        application: this.application,
        isFluor: this.isFluor,
        isProduction: this.isProduction,
        details: details,
      };
      await this.panelContext.actions.updatePanel({
        id: this.panel.id,
        data: data,
      });
      this.$router.back();
    }
  }

  async mounted() {
    await Promise.all([
      this.panelContext.actions.getPanel(+this.$router.currentRoute.params.id),
      this.conjugateContext.actions.getConjugates(),
      this.tagContext.actions.getTags(),
    ]);
    this.reset();
  }
}
</script>
