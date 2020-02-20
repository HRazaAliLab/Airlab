<template functional>
  <v-card tile elevation="1">
    <v-card-text>
      <div><span class="subheader">Name: </span>{{ props.clone.name }}</div>
      <div>
        <span class="subheader">Protein: </span
        ><router-link
          class="link"
          :to="{
            name: 'main-group-proteins-edit',
            params: {
              groupId: props.groupId,
              id: props.clone.protein.id,
            },
          }"
        >
          {{ props.clone.protein.name }}
        </router-link>
      </div>
      <div><span class="subheader">Isotype: </span>{{ props.clone.isotype }}</div>
      <div><span class="subheader">Epitope: </span>{{ props.clone.epitope }}</div>
      <div><span class="subheader">Polyclonal: </span>{{ props.clone.isPolyclonal }}</div>
      <div><span class="subheader">Phospho: </span>{{ props.clone.isPhospho }}</div>
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
    type: Object,
    required: true,
  })
  readonly clone!: CloneDto;
}
</script>

<style scoped>
.subheader {
  font-weight: bold;
}
.link {
  text-decoration: none;
}
</style>
