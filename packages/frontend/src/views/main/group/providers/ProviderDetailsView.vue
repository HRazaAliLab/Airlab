<template>
  <v-card flat>
    <v-card-title>Provider Details</v-card-title>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>Info</v-tab>
        <v-tab-item>
          <ProviderView :provider-id="provider.id" />
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProviderDto } from "@airlab/shared/lib/provider/dto";
import ProviderView from "@/views/main/group/providers/ProviderView.vue";

@Component({
  components: { ProviderView },
})
export default class ProviderDetailsView extends Vue {
  @Prop(Object) readonly provider!: ProviderDto;

  private tab = 0;
}
</script>
