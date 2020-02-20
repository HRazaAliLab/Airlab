<template>
  <v-card flat>
    <v-card-title>Species: {{ species.name }}</v-card-title>
    <v-card-subtitle>Host in clones</v-card-subtitle>
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
import { SpeciesDto } from "@airlab/shared/lib/species/dto";
import { CloneDto } from "@airlab/shared/lib/clone/dto";
import { speciesModule } from "@/modules/species";

@Component({
  components: { CloneView },
})
export default class SpeciesDetailsView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly speciesContext = speciesModule.context(this.$store);

  @Prop({
    type: Object,
    required: true,
  })
  readonly species!: SpeciesDto;

  clones: CloneDto[] = [];

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.clones = await this.speciesContext.actions.getSpeciesClones(this.species.id);
  }
}
</script>

<style scoped>
.item-view {
  margin-bottom: 10px;
}
</style>
