<template>
  <v-list dense>
    <template v-for="item in items">
      <v-list-item dense two-line :key="item.name">
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle v-if="item.value.startsWith('http')">
            <a target="_blank" :href="item.value">{{ item.value }}</a>
          </v-list-item-subtitle>
          <v-list-item-subtitle v-else>
            {{ item.value }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class InfoView extends Vue {
  @Prop(Object) item;

  get items() {
    if (this.item.meta) {
      const items = Object.entries(this.item.meta);
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
