<template functional>
  <v-card flat>
    <v-card-title>{{ props.item.name }}</v-card-title>
    <v-card-text>
      {{ props.item }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProteinDto } from "@airlab/shared/lib/protein/dto";

@Component
export default class ProteinDetailsView extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly item!: ProteinDto;
}
</script>
