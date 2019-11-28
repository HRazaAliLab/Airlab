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
        <div class="headline primary--text">Create Panel</div>
      </v-card-title>
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
          <v-checkbox label="Fluor" v-model="isFluor" />
          <v-checkbox label="Production" v-model="isProduction" />
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
      <v-card-text>
        <v-expansion-panels v-model="expanded" multiple>
          <MetalExpansionPanel
            v-for="metal in metals"
            :key="metal.id"
            :tag="metal"
            :initial-state="initialState"
            :on-selected="congugateSelected"
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
import { CreatePanelDto } from "@airlab/shared/lib/panel/dto";
import { conjugateModule } from "@/modules/conjugate";
import { tagModule } from "@/modules/tag";
import MetalExpansionPanel from "@/views/main/group/panels/MetalExpansionPanel.vue";

@Component({
  components: { MetalExpansionPanel },
})
export default class CreatePanel extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly panelContext = panelModule.context(this.$store);
  readonly conjugateContext = conjugateModule.context(this.$store);
  readonly tagContext = tagModule.context(this.$store);

  readonly nameRules = [required];
  readonly descriptionRules = [];

  fab = false;

  valid = false;
  name = "";
  description = "";
  application = "";
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

  onScroll(e) {
    if (typeof window === "undefined") return;
    const top = window.pageYOffset || e.target.scrollTop || 0;
    this.fab = top > 20;
  }

  toTop() {
    this.$vuetify.goTo(0);
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
    this.name = "";
    this.description = "";
    this.application = "";
    this.isFluor = false;
    this.isProduction = false;
    this.tagConjugates = new Map<number, number>();
    this.initialState = {};
    (this.$refs.form as any).resetValidation();
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.activeGroupId) {
      const details: any[] = [];
      this.tagConjugates.forEach((item, key, map) => {
        details.push({
          plaLabeledAntibodyId: item,
          plaActualConc: undefined,
        });
      });
      const data: CreatePanelDto = {
        groupId: this.activeGroupId,
        name: this.name,
        description: this.description,
        application: this.application ? Number(this.application) : null,
        isFluor: this.isFluor,
        isProduction: this.isProduction,
        details: details,
      };
      await this.panelContext.actions.createPanel(data);
      this.$router.back();
    }
  }

  async mounted() {
    await Promise.all([this.conjugateContext.actions.getConjugates(), this.tagContext.actions.getTags()]);
  }
}
</script>
