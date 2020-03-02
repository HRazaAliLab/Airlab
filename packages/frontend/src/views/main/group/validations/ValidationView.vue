<template functional>
  <v-card tile elevation="1" class="mb-3">
    <v-card-title>
      <v-chip class="mr-1">
        {{ props.validation.application | applicationToString }}
      </v-chip>
    </v-card-title>
    <v-card-text>
      <div>
        <span class="subheader">Works: </span>
        <v-chip :color="$options.methods.getColor(props.validation)" class="mr-1" dark small label>
          {{ props.validation.status | validationStatusToString }}
        </v-chip>
      </div>
      <div>
        <span class="subheader">Clone: </span>
        <router-link
          class="link"
          :to="{
            name: 'main-group-clones-edit',
            params: {
              groupId: props.groupId,
              id: props.validation.clone.id,
            },
          }"
        >
          {{ props.validation.clone.name }}
        </router-link>
      </div>
      <div v-if="props.validation.lot">
        <span class="subheader">Lot: </span>
        <router-link
          class="link"
          :to="{
            name: 'main-group-lots-edit',
            params: {
              groupId: props.groupId,
              id: props.validation.lot.id,
            },
          }"
        >
          {{ props.validation.lot.name }}
        </router-link>
      </div>
      <div v-if="props.validation.conjugate">
        <span class="subheader">Conjugate: </span>
        <router-link
          class="link"
          :to="{
            name: 'main-group-lots-edit',
            params: {
              groupId: props.groupId,
              id: props.validation.conjugate.id,
            },
          }"
        >
          {{ props.validation.conjugate.tubeNumber }}
        </router-link>
      </div>
      <div v-if="props.validation.user">
        <span class="subheader">Created by: </span>
        <router-link
          class="link"
          :to="{
            name: 'main-admin-users-edit',
            params: {
              groupId: props.groupId,
              id: props.validation.user.id,
            },
          }"
        >
          {{ props.validation.user.name }}
        </router-link>
      </div>
      <div><span class="subheader">Positive control: </span>{{ props.validation.positiveControl }}</div>
      <div><span class="subheader">Negative control: </span>{{ props.validation.negativeControl }}</div>
      <div v-if="props.validation.species">
        <span class="subheader">Species tested: </span>{{ props.validation.species.name }}
      </div>
      <div><span class="subheader">Tissue: </span>{{ props.validation.tissue }}</div>
      <div><span class="subheader">Incubation conditions: </span>{{ props.validation.incubationConditions }}</div>
      <div><span class="subheader">Concentration: </span>{{ props.validation.concentration }}</div>
      <div><span class="subheader">Concentration unit: </span>{{ props.validation.concentrationUnit }}</div>
      <div><span class="subheader">Fixation: </span>{{ props.validation.fixation }}</div>
      <div v-if="props.validation.fixationNotes">
        <span class="subheader">Fixation notes: </span>{{ props.validation.fixationNotes }}
      </div>
      <div v-if="props.validation.notes"><span class="subheader">Notes: </span>{{ props.validation.notes }}</div>
      <div v-if="props.validation.antigenRetrievalType">
        <span class="subheader">Antigen retrieval type: </span>{{ props.validation.antigenRetrievalType }}
      </div>
      <div v-if="props.validation.antigenRetrievalTime">
        <span class="subheader">Antigen retrieval time: </span>{{ props.validation.antigenRetrievalTime }}
      </div>
      <div v-if="props.validation.antigenRetrievalTemperature">
        <span class="subheader">Antigen retrieval temperature: </span>{{ props.validation.antigenRetrievalTemperature }}
      </div>
      <div v-if="props.validation.saponin !== null">
        <v-checkbox label="Saponin" v-model="props.validation.saponin" readonly hide-details />
        <span class="subheader">Saponin concentration: </span>{{ props.validation.saponinConcentration }}
      </div>
      <div v-if="props.validation.methanolTreatment !== null">
        <v-checkbox label="Methanol treatment" v-model="props.validation.methanolTreatment" readonly hide-details />
        <span class="subheader">Methanol treatment concentration: </span
        >{{ props.validation.methanolTreatmentConcentration }}
      </div>
      <div v-if="props.validation.surfaceStaining !== null">
        <v-checkbox label="Surface staining" v-model="props.validation.surfaceStaining" readonly hide-details />
        <span class="subheader">Surface staining concentration: </span
        >{{ props.validation.surfaceStainingConcentration }}
      </div>
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

  private getColor(validation) {
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
.subheader {
  font-weight: bold;
}
</style>
