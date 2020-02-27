<template>
  <v-card flat>
    <v-card-title>Species Details</v-card-title>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>Info</v-tab>
        <v-tab-item>
          <SpeciesView :species-id="species.id" />
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SpeciesDto } from "@airlab/shared/lib/species/dto";
import SpeciesView from "@/views/main/group/species/SpeciesView.vue";

@Component({
  components: { SpeciesView },
})
export default class SpeciesDetailsView extends Vue {
  @Prop(Object) readonly species!: SpeciesDto;

  private tab = 0;
}
</script>
