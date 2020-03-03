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
    <v-toolbar dense>
      <v-toolbar-title>
        Create Panel
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
          <v-checkbox label="Fluorophore" v-model="isFluorophore" />
          <v-checkbox label="Locked" v-model="isLocked" />
        </v-form>
      </v-card-text>
      <v-card-text>
        <v-toolbar dense class="mb-2" elevation="1">
          <template>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search by clone name"
              dense
              single-line
              hide-details
              clearable
            />
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
            :selected-conjugates="getInitialState(metal.id)"
            :conjugates="getTagConjugates(metal.id)"
            :species-map="speciesMap"
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
import { CreatePanelDto, PanelElementDataDto } from "@airlab/shared/lib/panel/dto";
import { conjugateModule } from "@/modules/conjugate";
import { tagModule } from "@/modules/tag";
import MetalExpansionPanel from "@/views/main/group/panels/MetalExpansionPanel.vue";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { SpeciesDto } from "@airlab/shared/lib/species/dto";
import { speciesModule } from "@/modules/species";

@Component({
  components: { MetalExpansionPanel },
})
export default class CreatePanel extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly panelContext = panelModule.context(this.$store);
  private readonly conjugateContext = conjugateModule.context(this.$store);
  private readonly tagContext = tagModule.context(this.$store);
  private readonly speciesContext = speciesModule.context(this.$store);

  private readonly nameRules = [required];
  private readonly descriptionRules = [];

  private fab = false;
  private showEmpty = false;
  private search: string | null = null;

  private valid = false;
  private name = "";
  private description = "";
  private application: string | null = null;
  private isFluorophore = false;
  private isLocked = false;
  private selectedTagConjugates = new Map<number, Set<ConjugateDto>>();

  private expanded: number[] = []; // this.metals.map((k, i) => i);

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  private get metals() {
    return Object.freeze(this.tagContext.getters.metals);
  }

  private get speciesMap() {
    const map = new Map<number, SpeciesDto>();
    for (const s of this.speciesContext.getters.species) {
      map.set(s.id, s);
    }
    return Object.freeze(map);
  }

  private get conjugates() {
    let items = this.showEmpty
      ? Object.freeze(this.conjugateContext.getters.conjugates)
      : Object.freeze(this.conjugateContext.getters.conjugates.filter(item => item.status !== 2));
    if (this.search !== null) {
      const normalizedSearchTerm = this.search.toLowerCase().trim();
      items = items.filter(item => (item as any).lot.clone.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1);
    }
    return items;
  }

  private getInitialState(tagId: number) {
    const items = this.selectedTagConjugates.get(tagId);
    return items ? [...items] : [];
  }

  private getTagConjugates(tagId: number) {
    return this.conjugates.filter(item => item.tagId === tagId);
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
        set.forEach(conjugate => {
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
    await Promise.all([
      this.conjugateContext.actions.getGroupConjugates(+this.$router.currentRoute.params.groupId),
      this.tagContext.actions.getGroupTags(+this.$router.currentRoute.params.groupId),
      this.speciesContext.actions.getGroupSpecies(+this.$router.currentRoute.params.groupId),
    ]);
  }
}
</script>
