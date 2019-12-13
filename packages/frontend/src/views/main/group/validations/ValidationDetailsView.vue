<template functional>
  <v-card flat>
    <v-card-title>{{ props.item.application | applicationToString }}</v-card-title>
    <v-card-text>
      <div v-for="file in props.item.validationFiles" :key="file.id">
        <iframe :src="`${props.apiUrl}/validationFiles/${file.id}/serve`" allowfullscreen class="iframe" />
        <a target="_blank" :href="`${props.apiUrl}/validationFiles/${file.id}/serve`">{{ file.name }}</a>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ValidationDto } from "@airlab/shared/lib/validation/dto";

@Component
export default class ValidationDetailsView extends Vue {
  @Prop({
    type: String,
    required: true,
  })
  readonly apiUrl!: string;

  @Prop({
    type: Object,
    required: true,
  })
  readonly item!: ValidationDto;
}
</script>

<style scoped>
.iframe {
  width: 100%;
  height: 400px;
  border: 0;
}
</style>
