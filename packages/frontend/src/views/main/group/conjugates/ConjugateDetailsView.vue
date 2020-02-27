<template>
  <v-card flat>
    <v-card-title>Conjugate Details</v-card-title>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>Info</v-tab>
        <v-tab-item>
          <ConjugateView :conjugate-id="conjugate.id" />
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ConjugateView from "@/views/main/group/conjugates/ConjugateView.vue";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";

@Component({
  components: { ConjugateView },
})
export default class ProviderDetailsView extends Vue {
  @Prop(Object) readonly conjugate!: ConjugateDto;

  private tab = 0;
}
</script>
