<template>
  <v-card tile elevation="1" class="mb-3">
    <v-card-title>
      <v-chip :color="getStatusColor(validation)" class="mr-1" x-small dark>
        {{ validation.application | applicationToString }}
      </v-chip>
    </v-card-title>
    <v-card-text>
      <div class="subtitle-1">Status: {{ validation.status | validationStatusToString }}</div>
      <div class="grey--text">Application: {{ validation.application | applicationToString }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary"
        text
        :to="{
          name: 'main-group-validations-edit',
          params: {
            groupId: groupId,
            id: validation.id,
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
import { ValidationDto } from "@airlab/shared/lib/validation/dto";
import { getStatusColor } from "@/utils/converters";

@Component
export default class ValidationView extends Vue {
  @Prop(Number) readonly groupId!: number;
  @Prop(Object) readonly validation!: ValidationDto;

  readonly getStatusColor = getStatusColor;
}
</script>
