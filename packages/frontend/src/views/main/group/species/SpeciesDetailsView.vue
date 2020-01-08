<template>
  <v-card flat>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-information-outline</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Clones</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <CloneView v-for="clone in clones" :key="clone.id" :group-id="activeGroupId" :api-url="apiUrl" :clone="clone" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { apiUrl } from "@/env";
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
  readonly apiUrl = apiUrl;

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
