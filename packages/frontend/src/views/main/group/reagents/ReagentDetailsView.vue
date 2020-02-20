<template>
  <v-card flat>
    <v-card-title>Reagent: {{ reagent.name }}</v-card-title>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>Lots</v-tab>
        <v-tab>Metadata</v-tab>
        <v-tab-item>
          <LotView v-for="lot in lots" :key="lot.id" :group-id="activeGroupId" :lot="lot" class="mb-3" />
        </v-tab-item>
        <v-tab-item>
          <InfoView :item="reagent" />
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LotView from "@/views/main/group/lots/LotView.vue";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import { groupModule } from "@/modules/group";
import { ReagentDto } from "@airlab/shared/lib/reagent/dto";
import { reagentModule } from "@/modules/reagent";
import InfoView from "@/components/InfoView.vue";

@Component({
  components: { InfoView, LotView },
})
export default class ReagentDetailsView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly reagentContext = reagentModule.context(this.$store);

  @Prop(Object) readonly reagent!: ReagentDto;

  tab = 0;
  lots: LotDto[] = [];

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.lots = await this.reagentContext.actions.getReagentLots(this.reagent.id);
  }
}
</script>
