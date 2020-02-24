<template>
  <v-card flat>
    <v-card-title>Tube Number: {{ conjugate.tubeNumber }}</v-card-title>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>Panels</v-tab>
        <v-tab v-if="conjugate.meta">Metadata</v-tab>
        <v-tab-item>
          <div v-for="panel in panels" :key="panel.id" class="mb-3">
            {{ panel.id }}
          </div>
        </v-tab-item>
        <v-tab-item>
          <InfoView :item="conjugate" />
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import InfoView from "@/components/InfoView.vue";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { conjugateModule } from "@/modules/conjugate";
import { PanelDto } from "@airlab/shared/lib/panel/dto";

@Component({
  components: { InfoView },
})
export default class ConjugateDetailsView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly conjugateContext = conjugateModule.context(this.$store);

  @Prop({
    type: Object,
    required: true,
  })
  readonly conjugate!: ConjugateDto;

  tab = 0;
  panels: PanelDto[] = [];

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.panels = await this.conjugateContext.actions.getConjugatePanels(this.conjugate.id);
  }
}
</script>
