<template>
  <div class="mx-2 mt-2">
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" v-scroll="onScroll" v-show="fab" fab fixed bottom right color="primary" @click="toTop">
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </template>
      <span>Scroll to top</span>
    </v-tooltip>
    <v-toolbar dense>
      <v-toolbar-title>Edit Panel</v-toolbar-title>
      <v-spacer />
      <v-switch v-model="alternateView" label="Alternate View" hide-details class="toolbox-item-margin" />
      <v-switch v-model="showOverview" label="Overview" hide-details />
      <v-toolbar-items>
        <v-btn @click="cancel" text color="primary">Cancel</v-btn>
        <v-btn @click="reset" text color="primary">Reset</v-btn>
        <v-btn @click="submit" text :disabled="!valid" color="primary">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-expansion-panels class="mt-4" v-model="expanded">
      <v-expansion-panel>
        <v-expansion-panel-header>Details</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-form v-model="valid" ref="form">
            <v-text-field label="Name" v-model="name" :rules="nameRules" />
            <v-text-field label="Description" v-model="description" />
            <div class="text-subtitle-1">Application</div>
            <v-btn-toggle v-model="application">
              <v-btn small value="0">SMC</v-btn>
              <v-btn small value="1">IMC</v-btn>
              <v-btn small value="2">FC</v-btn>
              <v-btn small value="3">IF</v-btn>
              <v-btn small value="4">IHC</v-btn>
              <v-btn small value="5">IHCF</v-btn>
              <v-btn small value="6">WB</v-btn>
            </v-btn-toggle>
            <v-checkbox label="Fluorophore" v-model="isFluorophore" />
            <v-checkbox label="Locked" v-model="isLocked" />
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-row dense class="mt-1">
      <v-col v-if="!alternateView" :cols="showOverview ? 2 : 3">
        <PanelTagsView :expanded="expanded" />
      </v-col>
      <v-col :cols="alternateView ? (showOverview ? 8 : 12) : showOverview ? 6 : 9">
        <AllConjugatesView
          v-if="alternateView"
          :on-selected="congugateSelected"
          :selected-conjugates="getInitialState()"
        />
        <TagConjugatesView
          v-else-if="activePanelTag"
          :tag="activePanelTag"
          :on-selected="congugateSelected"
          :selected-conjugates="getInitialState()"
        />
      </v-col>
      <v-col v-show="showOverview" cols="4">
        <PanelPreview :conjugates="selectedTagConjugates" :expanded="expanded" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { required } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";
import { panelModule } from "@/modules/panel";
import { PanelElementDataDto, UpdatePanelDto } from "@airlab/shared/lib/panel/dto";
import { conjugateModule } from "@/modules/conjugate";
import { tagModule } from "@/modules/tag";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { speciesModule } from "@/modules/species";
import PanelTagsView from "@/views/main/group/panels/PanelTagsView.vue";
import TagConjugatesView from "@/views/main/group/panels/TagConjugatesView.vue";
import PanelPreview from "@/views/main/group/panels/PanelPreview.vue";
import { validationModule } from "@/modules/validation";
import AllConjugatesView from "@/views/main/group/panels/AllConjugatesView.vue";

type ConjugatePanelData = {
  dilutionType: number;
  concentration?: number;
  pipet?: number;
};

@Component({
  components: { AllConjugatesView, PanelPreview, TagConjugatesView, PanelTagsView },
})
export default class EditPanel extends Vue {
  private readonly panelContext = panelModule.context(this.$store);
  private readonly conjugateContext = conjugateModule.context(this.$store);
  private readonly tagContext = tagModule.context(this.$store);
  private readonly speciesContext = speciesModule.context(this.$store);
  private readonly validationContext = validationModule.context(this.$store);

  private readonly nameRules = [required];

  private fab = false;
  private expanded = 0;
  private showOverview = true;
  private alternateView = false;

  private valid = false;
  private name = "";
  private description = "";
  private application: string | null = null;
  private isFluorophore = false;
  private isLocked = false;

  private selectedTagConjugates = new Map<number, Set<ConjugateDto>>();
  private conjugatePanelData = new Map<number, ConjugatePanelData>();

  get activePanelTagId() {
    return this.panelContext.getters.activePanelTagId;
  }

  get activePanelTag() {
    return this.activePanelTagId ? this.tagContext.getters.getTag(this.activePanelTagId) : null;
  }

  private get panel() {
    return this.panelContext.getters.getPanel(+this.$router.currentRoute.params.id);
  }

  private getInitialState() {
    if (this.alternateView) {
      const result: ConjugateDto[] = [];
      for (const conjugates of this.selectedTagConjugates.values()) {
        for (const item of conjugates.values()) {
          result.push(item);
        }
      }
      return result;
    } else {
      const items = this.selectedTagConjugates.get(this.activePanelTagId!);
      return items ? [...items] : [];
    }
  }

  private onScroll(e) {
    if (typeof window === "undefined") return;
    const top = window.pageYOffset || e.target.scrollTop || 0;
    this.fab = top > 20;
  }

  private toTop() {
    this.$vuetify.goTo(0);
  }

  private congugateSelected(tagId: number, conjugate: ConjugateDto, isSelected: boolean) {
    let conjugatesSet = this.selectedTagConjugates.get(tagId);
    if (!conjugatesSet) {
      conjugatesSet = new Set<ConjugateDto>();
      this.selectedTagConjugates.set(tagId, conjugatesSet);
    }
    if (isSelected) {
      conjugatesSet.add(conjugate);
    } else {
      conjugatesSet.delete(conjugate);
    }
    this.selectedTagConjugates = new Map(this.selectedTagConjugates);
  }

  private cancel() {
    this.$router.back();
  }

  private reset() {
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
    if (this.panel) {
      this.name = this.panel.name;
      this.description = this.panel.description;
      this.application = this.panel.application ? this.panel.application.toString(10) : "";
      this.isFluorophore = this.panel.isFluorophore;
      this.isLocked = this.panel.isLocked;
      this.selectedTagConjugates = new Map<number, Set<ConjugateDto>>();
      this.conjugatePanelData = new Map<number, ConjugatePanelData>();
      if (this.panel.elements.length > 0) {
        for (const element of this.panel.elements) {
          const conjugate = this.conjugateContext.getters.getConjugate(element.conjugateId);
          const tagId = conjugate.tagId;
          let conjugatesSet = this.selectedTagConjugates.get(tagId);
          if (!conjugatesSet) {
            conjugatesSet = new Set<ConjugateDto>();
            this.selectedTagConjugates.set(tagId, conjugatesSet);
          }
          this.conjugatePanelData.set(element.conjugateId, {
            dilutionType: element.dilutionType,
            concentration: element.concentration,
          });
          conjugatesSet.add(conjugate);
        }
      }
    }
  }

  private async submit() {
    if ((this.$refs.form as any).validate() && this.panel) {
      const elements: PanelElementDataDto[] = [];
      this.selectedTagConjugates.forEach((set: Set<ConjugateDto>, key, map) => {
        set.forEach((conjugate) => {
          const conjugateData = this.conjugatePanelData.get(conjugate.id);
          elements.push({
            conjugateId: conjugate.id,
            dilutionType: conjugateData ? conjugateData.dilutionType : 0,
            concentration: conjugateData ? conjugateData.concentration : undefined,
          });
        });
      });
      const data: UpdatePanelDto = {
        name: this.name,
        description: this.description,
        application: Number(this.application),
        isFluorophore: this.isFluorophore,
        isLocked: this.isLocked,
        elements: elements,
      };
      await this.panelContext.actions.updatePanel({
        id: this.panel.id,
        data: data,
      });
      this.$router.back();
    }
  }

  async mounted() {
    this.panelContext.mutations.setActivePanelTagId(null);
    await Promise.all([
      this.panelContext.actions.getPanel(+this.$router.currentRoute.params.id),
      this.conjugateContext.actions.getGroupConjugates(+this.$router.currentRoute.params.groupId),
      this.tagContext.actions.getGroupTags(+this.$router.currentRoute.params.groupId),
      this.speciesContext.actions.getGroupSpecies(+this.$router.currentRoute.params.groupId),
      this.validationContext.actions.getGroupValidations(+this.$route.params.groupId),
    ]);
    this.reset();
  }
}
</script>

<style scoped>
.toolbox-item-margin {
  margin-right: 16px;
}
</style>
