<template functional>
  <v-card flat>
    <v-card-title :class="props.conjugate.isLow && 'low'">Tube Number: {{ props.conjugate.tubeNumber }}</v-card-title>
    <v-card-text>
      {{ props.conjugate }}
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        text
        :to="{
          name: 'main-group-conjugates-edit',
          params: {
            groupId: props.groupId,
            id: props.conjugate.id,
          },
        }"
      >
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";

@Component
export default class ConjugateView extends Vue {
  @Prop({
    type: Number,
    required: true,
  })
  readonly groupId!: number;

  @Prop({
    type: String,
    required: true,
  })
  readonly apiUrl!: string;

  @Prop({
    type: Object,
    required: true,
  })
  readonly conjugate!: ConjugateDto;
}
</script>

<style scoped>
.low {
  color: palevioletred;
}
</style>
