<template>
  <v-container fluid>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" v-scroll="onScroll" v-show="fab" fab fixed bottom right color="primary" @click="toTop">
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </template>
      <span>Scroll to top</span>
    </v-tooltip>
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
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn @click="reset">Reset</v-btn>
        <v-btn @click="submit" :disabled="!valid">Save</v-btn>
      </v-card-actions>
      <v-card-text>
        <v-toolbar dense class="mb-2" elevation="1">
          <template>
            <v-spacer />
            <v-switch v-model="showEmpty" label="Show empty" hide-details inset class="ml-6" />
          </template>
        </v-toolbar>
        <v-expansion-panels v-model="expanded" multiple>
          <MetalExpansionPanel
            v-for="metal in metals"
            :key="metal.id"
            :tag="metal"
            :on-selected="congugateSelected"
            :initial-state="initialState"
            :show-empty="showEmpty"
          />
        </v-expansion-panels>
      </v-card-text>
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
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";

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

  readonly keys = [
    { id: "tubeNumber", title: "Tube Number" },
    { id: "concentration", title: "Concentration" },
    { id: "description", title: "Description" },
  ];

  fab = false;
  showEmpty = false;

  valid = false;
  name = "";
  description = "";
  application: number | null = null;
  isFluor = false;
  isProduction = false;
  tagConjugates = new Map<number, number>();
  initialState = {};

  expanded: number[] = []; // this.metals.map((k, i) => i);

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get metals() {
    return this.tagContext.getters.metals;
  }

  get panel() {
    return this.panelContext.getters.getPanel(+this.$router.currentRoute.params.id);
  }

  onScroll(e) {
    if (typeof window === "undefined") return;
    const top = window.pageYOffset || e.target.scrollTop || 0;
    this.fab = top > 20;
  }

  toTop() {
    this.$vuetify.goTo(0);
  }

  congugateSelected(tagId: number, conjugate: ConjugateDto, isSelected: boolean) {
    if (isSelected) {
      this.tagConjugates.set(tagId, conjugate.id);
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
        const newExpanded: any[] = [];
        const initialState = {};
        for (const item of this.panel.details) {
          const conjugateId = Number(item["plaLabeledAntibodyId"]);
          const conjugate = this.conjugateContext.getters.getConjugate(conjugateId);
          this.tagConjugates.set(conjugate.tagId, conjugateId);
          initialState[conjugate.tagId] = [conjugate];
          const tag = this.tagContext.getters.getTag(conjugate.tagId);
          newExpanded.push(this.metals.indexOf(tag));
        }
        this.expanded = newExpanded;
        this.initialState = initialState;
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
          plaPipet: undefined,
          dilutionType: undefined,
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
      this.conjugateContext.actions.getGroupConjugates(+this.$router.currentRoute.params.groupId),
      this.tagContext.actions.getGroupTags(+this.$router.currentRoute.params.groupId),
    ]);
    this.reset();
  }
}
</script>
