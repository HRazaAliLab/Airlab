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
      <v-toolbar-title>Create Panel</v-toolbar-title>
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
        <AllConjugatesView v-if="alternateView" :on-selected="congugateSelected" />
        <TagConjugatesView v-else-if="activePanelTag" :tag="activePanelTag" :on-selected="congugateSelected" />
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
import { CreatePanelDto, PanelElementDataDto } from "@airlab/shared/lib/panel/dto";
import { conjugateModule } from "@/modules/conjugate";
import { tagModule } from "@/modules/tag";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { speciesModule } from "@/modules/species";
import PanelTagsView from "@/views/main/group/panels/PanelTagsView.vue";
import TagConjugatesView from "@/views/main/group/panels/TagConjugatesView.vue";
import PanelPreview from "@/views/main/group/panels/PanelPreview.vue";
import { validationModule } from "@/modules/validation";
import { groupModule } from "@/modules/group";
import AllConjugatesView from "@/views/main/group/panels/AllConjugatesView.vue";

@Component({
  components: { AllConjugatesView, PanelPreview, TagConjugatesView, PanelTagsView },
})
export default class CreatePanel extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
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

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get activePanelTagId() {
    return this.panelContext.getters.activePanelTagId;
  }

  get activePanelTag() {
    return this.activePanelTagId ? this.tagContext.getters.getTag(this.activePanelTagId) : null;
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
    this.name = "";
    this.description = "";
    this.application = "";
    this.isFluorophore = false;
    this.isLocked = false;
    this.selectedTagConjugates = new Map<number, Set<ConjugateDto>>();
    (this.$refs.form as any).resetValidation();
  }

  private async submit() {
    if ((this.$refs.form as any).validate() && this.activeGroupId) {
      const elements: PanelElementDataDto[] = [];
      this.selectedTagConjugates.forEach((set: Set<ConjugateDto>, key, map) => {
        set.forEach((conjugate) => {
          elements.push({
            conjugateId: conjugate.id,
            dilutionType: 0,
          });
        });
      });
      const data: CreatePanelDto = {
        groupId: this.activeGroupId,
        name: this.name,
        description: this.description,
        application: this.application ? Number(this.application) : null,
        isFluorophore: this.isFluorophore,
        isLocked: this.isLocked,
        elements: elements,
      };
      await this.panelContext.actions.createPanel(data);
      this.$router.back();
    }
  }

  async mounted() {
    this.panelContext.mutations.setActivePanelTagId(null);
    await Promise.all([
      this.conjugateContext.actions.getGroupConjugates(+this.$router.currentRoute.params.groupId),
      this.tagContext.actions.getGroupTags(+this.$router.currentRoute.params.groupId),
      this.speciesContext.actions.getGroupSpecies(+this.$router.currentRoute.params.groupId),
      this.validationContext.actions.getGroupValidations(+this.$route.params.groupId),
    ]);
  }
}
</script>
