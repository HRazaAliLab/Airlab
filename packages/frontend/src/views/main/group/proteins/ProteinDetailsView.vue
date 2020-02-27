<template>
  <v-card flat>
    <v-card-title>Protein Details</v-card-title>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>Info</v-tab>
        <v-tab-item>
          <ProteinView :protein-id="protein.id" />
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProteinDto } from "@airlab/shared/lib/protein/dto";
import ProteinView from "@/views/main/group/proteins/ProteinView.vue";

@Component({
  components: { ProteinView },
})
export default class ProteinDetailsView extends Vue {
  @Prop(Object) readonly protein!: ProteinDto;

  private tab = 0;
}
</script>
