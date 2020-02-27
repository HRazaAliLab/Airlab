<template>
  <v-card flat>
    <v-card-title>Panel Details</v-card-title>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>Info</v-tab>
        <v-tab-item>
          <PanelView :panel-id="panel.id" />
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PanelDto } from "@airlab/shared/lib/panel/dto";
import PanelView from "@/views/main/group/panels/PanelView.vue";

@Component({
  components: { PanelView },
})
export default class PanelDetailsView extends Vue {
  @Prop(Object) readonly panel!: PanelDto;

  private tab = 0;
}
</script>
