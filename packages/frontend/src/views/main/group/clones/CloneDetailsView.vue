<template>
  <v-card flat>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-information-outline</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Clone: {{ item.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <LotView v-for="lot in lots" :key="lot.id" :group-id="activeGroupId" :item="lot" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { cloneModule } from "@/modules/clone";
import { CloneDto } from "@airlab/shared/lib/clone/dto";
import LotView from "@/views/main/group/lots/LotView.vue";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import { groupModule } from "@/modules/group";
@Component({
  components: { LotView },
})
export default class CloneDetailsView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly cloneContext = cloneModule.context(this.$store);

  @Prop(Object) item!: CloneDto;

  lots: LotDto[] = [];

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.lots = await this.cloneContext.actions.getCloneLots(this.item.id);
  }
}
</script>
