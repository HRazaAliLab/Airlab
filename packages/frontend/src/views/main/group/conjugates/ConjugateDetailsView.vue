<template functional>
  <v-card flat>
    <v-card-title>{{ props.item.tubeNumber }}</v-card-title>
    <v-card-text>
      {{ props.item }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";

@Component
export default class ConjugateDetailsView extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly item!: ConjugateDto;
}
</script>
