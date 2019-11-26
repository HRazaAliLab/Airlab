<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Create Panel</div>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field label="Name" v-model="name" :rules="nameRules" />
          <v-text-field label="Description" v-model="description" :rules="descriptionRules" />
          <v-text-field label="Application" v-model="application" :rules="applicationRules" />
          <v-checkbox label="Fluor" v-model="isFluor" />
          <v-checkbox label="Production" v-model="isProduction" />
          <v-expansion-panels v-model="expanded" multiple>
            <MetalExpansionPanel v-for="metal in metals" :key="metal.id" :tag="metal" :onSelected="congugateSelected" />
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
  readonly applicationRules = [];

  valid = false;
  name = "";
  description = "";
  application: number | null = null;
  isFluor = false;
  isProduction = false;

  expanded = []; // this.metals.map((k, i) => i);

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get conjugates() {
    return this.conjugateContext.getters.conjugates;
  }

  get metals() {
    return this.tagContext.getters.metals;
  }

  congugateSelected(tag, conjugate) {
    console.log(tag.name);
    console.log(conjugate);
  }

  cancel() {
    this.$router.back();
  }

  reset() {
    this.name = "";
    this.description = "";
    this.application = null;
    this.isFluor = false;
    this.isProduction = false;
    (this.$refs.form as any).resetValidation();
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.activeGroupId) {
      const data: CreatePanelDto = {
        groupId: this.activeGroupId,
        name: this.name,
        description: this.description,
        application: this.application,
        isFluor: this.isFluor,
        isProduction: this.isProduction,
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
