<template>
  <v-card flat>
    <v-card-title>Protein: {{ protein.name }}</v-card-title>
    <v-card-subtitle>Clones</v-card-subtitle>
    <v-card-text>
      <div v-for="clone in clones" :key="clone.id" class="item-view">
        <CloneView :group-id="activeGroupId" :clone="clone" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import CloneView from "@/views/main/group/clones/CloneView.vue";
import { CloneDto } from "@airlab/shared/lib/clone/dto";
import { ProteinDto } from "@airlab/shared/lib/protein/dto";
import { proteinModule } from "@/modules/protein";

@Component({
  components: { CloneView },
})
export default class ProteinDetailsView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly proteinContext = proteinModule.context(this.$store);

  @Prop({
    type: Object,
    required: true,
  })
  readonly protein!: ProteinDto;

  clones: CloneDto[] = [];

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.clones = await this.proteinContext.actions.getProteinClones(this.protein.id);
  }
}
</script>

<style scoped>
.item-view {
  margin-bottom: 10px;
}
</style>
