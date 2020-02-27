<template>
  <v-card flat>
    <v-card-title>Lot Details</v-card-title>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>Info</v-tab>
        <v-tab v-if="lot.meta">Metadata</v-tab>
        <v-tab-item>
          <LotView :lot-id="lot.id" />
        </v-tab-item>
        <v-tab-item>
          <InfoView :item="lot" />
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import InfoView from "@/components/InfoView.vue";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import LotView from "@/views/main/group/lots/LotView.vue";

@Component({
  components: { LotView, InfoView },
})
export default class LotDetailsView extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly lot!: LotDto;

  tab = 0;
}
</script>
