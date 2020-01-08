<template functional>
  <v-card flat>
    <v-card-title>{{ props.clone.name }}</v-card-title>
    <v-card-text>
      {{ props.clone }}
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        text
        :to="{
          name: 'main-group-clones-edit',
          params: {
            groupId: props.groupId,
            id: props.clone.id,
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
import { CloneDto } from "@airlab/shared/lib/clone/dto";

@Component
export default class CloneView extends Vue {
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
  readonly clone!: CloneDto;
}
</script>
