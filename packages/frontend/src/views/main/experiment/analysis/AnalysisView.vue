<template>
  <v-row no-gutters>
    <v-col>
      <v-tabs v-model="tab">
        <v-tab>Scatter Plot</v-tab>
        <v-tab>Box Plot</v-tab>
        <v-tab>PCA</v-tab>
        <v-tab>t-SNE</v-tab>
        <v-tab>UMAP</v-tab>
        <v-tab>PhenoGraph</v-tab>
        <v-tab>Segmentation</v-tab>
        <v-tab-item> </v-tab-item>
        <v-tab-item> </v-tab-item>
        <v-tab-item> </v-tab-item>
        <v-tab-item> </v-tab-item>
        <v-tab-item> </v-tab-item>
        <v-tab-item> </v-tab-item>
        <v-tab-item> </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AnalysisView extends Vue {
  tab = 0;
}
</script>

<style>
/**
   * The default size is 600px×400px, for responsive charts
   * you may need to set percentage values as follows (also
   * don't forget to provide a size for the container).
   */
.echarts {
  width: 100%;
  height: 100%;
}

.v-slide-group__prev {
  min-width: 0;
}
</style>
