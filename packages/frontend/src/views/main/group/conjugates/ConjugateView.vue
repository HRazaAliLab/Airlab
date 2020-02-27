<template functional>
  <v-card tile elevation="1">
    <v-card-text>
      <div :class="props.conjugate.isDeleted && 'deleted'">
        <span class="subheader">Tube Number: </span>{{ props.conjugate.tubeNumber }}
      </div>
      <div>
        <span class="subheader">Lot: </span>
        <router-link
          v-if="props.conjugate.lot"
          class="link"
          :to="{
            name: 'main-group-lots-edit',
            params: {
              groupId: props.groupId,
              id: props.conjugate.lot.id,
            },
          }"
        >
          {{ props.conjugate.lot.number }}
        </router-link>
      </div>
      <div>
        <span class="subheader">Status: </span>
        <v-chip :color="$options.methods.getColor(props.conjugate)" x-small dark label>
          {{ props.conjugate.status | conjugateStatusToString }}
        </v-chip>
      </div>
      <div><span class="subheader">Concentration: </span>{{ props.conjugate.concentration }}</div>
      <div><span class="subheader">Description: </span>{{ props.conjugate.description }}</div>
      <div><span class="subheader">Labeled: </span>{{ new Date(props.conjugate.labeledAt).toUTCString() }}</div>
      <div>
        <span class="subheader">By: </span
        ><router-link
          class="link"
          :to="{
            name: 'main-admin-users-edit',
            params: {
              groupId: props.groupId,
              id: props.conjugate.user.id,
            },
          }"
        >
          {{ props.conjugate.user.name }}
        </router-link>
      </div>
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
import { getConjugateStatusColor } from "@/utils/converters";

@Component
export default class ConjugateView extends Vue {
  @Prop({
    type: Number,
    required: true,
  })
  readonly groupId!: number;

  @Prop({
    type: Object,
    required: true,
  })
  readonly conjugate!: ConjugateDto;

  getColor(conjugate: ConjugateDto) {
    return getConjugateStatusColor(conjugate);
  }
}
</script>

<style scoped>
.subheader {
  font-weight: bold;
}
.deleted {
  color: palevioletred;
}
</style>
