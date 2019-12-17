<template functional>
  <v-card flat>
    <v-card-title>{{ props.reagent.name }}</v-card-title>
    <v-card-text>
      {{ props.reagent }}
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        text
        :to="{
          name: 'main-group-reagents-edit',
          params: {
            groupId: props.groupId,
            id: props.reagent.id,
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
import { ReagentDto } from "@airlab/shared/lib/reagent/dto";

@Component
export default class ReagentView extends Vue {
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
  readonly reagent!: ReagentDto;
}
</script>
