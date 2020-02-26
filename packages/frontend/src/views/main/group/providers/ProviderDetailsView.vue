<template>
  <v-card flat>
    <v-card-title>Provider: {{ provider.name }}</v-card-title>
    <v-card-subtitle>Lots</v-card-subtitle>
    <v-card-text>
      <div v-for="lot in lots" :key="lot.id" class="item-view">
        <LotView :group-id="activeGroupId" :lot="lot" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { providerModule } from "@/modules/provider";
import { ProviderDto } from "@airlab/shared/lib/provider/dto";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import LotView from "@/views/main/group/lots/LotView.vue";

@Component({
  components: { LotView },
})
export default class ProviderDetailsView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly providerContext = providerModule.context(this.$store);

  @Prop({
    type: Object,
    required: true,
  })
  readonly provider!: ProviderDto;

  lots: LotDto[] = [];

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.lots = await this.providerContext.actions.getProviderLots(this.provider.id);
  }
}
</script>

<style scoped>
.item-view {
  margin-bottom: 10px;
}
</style>
