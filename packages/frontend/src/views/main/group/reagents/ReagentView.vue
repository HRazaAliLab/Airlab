<template functional>
  <v-card tile elevation="1">
    <v-card-text>
      <div><span class="subheader">Name: </span>{{ props.reagent.name }}</div>
      <div><span class="subheader">Reference: </span>{{ props.reagent.reference }}</div>
      <div>
        <span class="subheader">Created by: </span
        ><router-link
          class="link"
          :to="{
            name: 'main-admin-users-edit',
            params: {
              groupId: props.groupId,
              id: props.reagent.user.id,
            },
          }"
        >
          {{ props.reagent.user.name }}
        </router-link>
      </div>
      <div v-if="props.reagent.meta" class="subheader">Metadata:</div>
      <div v-for="item in $options.methods.getMetaProps(props.reagent)" class="metadata">
        <span class="subheader">{{ item.name }}: </span>{{ item.value }}
      </div>
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
    type: Object,
    required: true,
  })
  readonly reagent!: ReagentDto;

  getMetaProps(item: ReagentDto) {
    if (item.meta) {
      const items = Object.entries(item.meta);
      return items.map(item => {
        return {
          name: item[0],
          value: item[1],
        };
      });
    } else {
      return [];
    }
  }
}
</script>

<style scoped>
.subheader {
  font-weight: bold;
}
.metadata {
  margin-left: 20px;
}
.link {
  text-decoration: none;
}
</style>
