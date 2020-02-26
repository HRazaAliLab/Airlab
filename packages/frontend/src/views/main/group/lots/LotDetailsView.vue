<template>
  <v-card flat>
    <v-card-title>Lot: {{ lot.name }}</v-card-title>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>Conjugates</v-tab>
        <v-tab v-if="lot.meta">Metadata</v-tab>
        <v-tab-item>
          <div v-for="conjugate in conjugates" :key="conjugate.id" class="mb-3">
            <ConjugateView :group-id="activeGroupId" :conjugate="conjugate" />
          </div>
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
import { groupModule } from "@/modules/group";
import InfoView from "@/components/InfoView.vue";
import { lotModule } from "@/modules/lot";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import ConjugateView from "@/views/main/group/conjugates/ConjugateView.vue";

@Component({
  components: { ConjugateView, InfoView },
})
export default class LotDetailsView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly lotContext = lotModule.context(this.$store);

  @Prop({
    type: Object,
    required: true,
  })
  readonly lot!: LotDto;

  tab = 0;
  conjugates: ConjugateDto[] = [];

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.conjugates = await this.lotContext.actions.getLotConjugates(this.lot.id);
  }
}
</script>
