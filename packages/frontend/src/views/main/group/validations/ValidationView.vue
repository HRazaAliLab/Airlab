<template functional>
  <v-card tile elevation="1" class="mb-3">
    <v-card-title>
      <v-chip :color="$options.methods.getColor(props.validation)" class="mr-1" dark>
        {{ props.validation.application | applicationToString }}
      </v-chip>
    </v-card-title>
    <v-card-text>
      <div v-for="file in props.validation.validationFiles" :key="file.id">
        <iframe :src="`${props.apiUrl}/validationFiles/${file.id}/serve`" allowfullscreen class="iframe" />
        <a target="_blank" :href="`${props.apiUrl}/validationFiles/${file.id}/serve`">{{ file.name }}</a>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary"
        text
        :to="{
          name: 'main-group-validations-edit',
          params: {
            groupId: props.groupId,
            id: props.validation.id,
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
  @Prop({
    type: String,
    required: true,
  })
  readonly apiUrl!: string;

  getColor(validation) {
    return getStatusColor(validation);
  }
}
</script>

<style scoped>
.iframe {
  width: 100%;
  height: 400px;
  border: 0;
}
</style>
