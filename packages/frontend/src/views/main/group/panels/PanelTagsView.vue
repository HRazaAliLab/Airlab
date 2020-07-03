<template>
  <v-card tile>
    <v-card-title>
      Tags
    </v-card-title>
    <v-toolbar dense flat>
      <v-text-field v-model="search" label="Search" single-line hide-details clearable dense>
        <template v-slot:append-outer>
          <v-icon dense>mdi-magnify</v-icon>
        </template>
      </v-text-field>
    </v-toolbar>
    <v-toolbar dense flat>
      <v-switch v-model="showOnlyMetals" label="Show only metals" hide-details inset />
    </v-toolbar>
    <v-list dense class="overflow-y-auto scroll-view">
      <v-list-item-group v-model="selectedTag" color="primary">
        <v-list-item v-for="tag in tags" :key="tag.id">
          <v-list-item-avatar :color="getColor(tag)" size="30">
            {{ tag.isMetal ? "M" : tag.isFluorophore ? "F" : "O" }}
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ tag.isMetal ? tag.name + tag.mw : tag.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { tagModule } from "@/modules/tag";
import { TagDto } from "@airlab/shared/lib/tag/dto";
import { panelModule } from "@/modules/panel";

@Component
export default class PanelTagsView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly tagContext = tagModule.context(this.$store);
  private readonly panelContext = panelModule.context(this.$store);

  private showOnlyMetals = false;
  private search: string | null = null;

  private get selectedTag() {
    return this.panelContext.getters.activePanelTag;
  }

  private set selectedTag(value: TagDto | null) {
    this.panelContext.mutations.setActivePanelTag(value);
  }

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  private get tags() {
    let items = this.showOnlyMetals
      ? this.tagContext.getters.tags.filter((item) => item.isMetal)
      : this.tagContext.getters.tags;
    items = items.sort((a, b) => a.name.localeCompare(b.name));
    if (this.search) {
      const normalizedSearch = this.search.toLowerCase().trim();
      return items.filter((item) => {
        return item.isMetal
          ? (item.name + item.mw).toLowerCase().includes(normalizedSearch)
          : item.name.toLowerCase().includes(normalizedSearch);
      });
    }
    return items;
  }

  private getColor(tag: TagDto) {
    if (tag.isMetal) {
      return "blue lighten-3";
    } else if (tag.isFluorophore) {
      return "purple lighten-4";
    }
    return "grey lighten-3";
  }

  async mounted() {
    await this.tagContext.actions.getGroupTags(+this.$router.currentRoute.params.groupId);
  }
}
</script>

<style scoped>
.scroll-view {
  height: calc(100vh - 710px);
}
</style>
