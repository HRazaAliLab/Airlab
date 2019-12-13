<template functional>
  <v-card flat>
    <v-card-title>{{ props.item.number }}</v-card-title>
    <v-card-text>
      {{ props.item }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LotDto } from "@airlab/shared/lib/lot/dto";

@Component
export default class LotDetailsView extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly item!: LotDto;
}
</script>
