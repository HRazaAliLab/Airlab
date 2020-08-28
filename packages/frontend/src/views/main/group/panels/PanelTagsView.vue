<template>
  <v-card tile>
    <v-card-title>Tags</v-card-title>
    <v-toolbar dense flat>
      <v-text-field v-model="search" label="Search tags" single-line hide-details clearable dense>
        <template v-slot:append-outer>
          <v-icon dense>mdi-magnify</v-icon>
        </template>
      </v-text-field>
    </v-toolbar>
    <v-toolbar dense flat>
      <v-select
        v-model="sortBy"
        flat
        solo
        hide-details
        :items="sortByOptions"
        item-value="id"
        item-text="title"
        prepend-inner-icon="mdi-sort"
        label="Sort by"
        dense
      />
      <v-spacer />
      <v-btn-toggle v-model="sortDesc" mandatory>
        <v-btn depressed :value="false" x-small>
          <v-icon x-small>mdi-arrow-up</v-icon>
        </v-btn>
        <v-btn depressed :value="true" x-small>
          <v-icon x-small>mdi-arrow-down</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>
    <v-toolbar dense flat>
      <v-switch v-model="showOnlyMetals" label="Show only metals" hide-details inset dense />
    </v-toolbar>
    <v-list dense class="overflow-y-auto" :height="height">
      <v-list-item-group v-model="selectedTag" color="primary">
        <v-list-item v-for="tag in tags" :key="tag.id" :value="tag.id">
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
import { Component, Prop, Vue } from "vue-property-decorator";
import { tagModule } from "@/modules/tag";
import { TagDto } from "@airlab/shared/lib/tag/dto";
import { panelModule } from "@/modules/panel";
import { responsiveModule } from "@/modules/responsive";

@Component
export default class PanelTagsView extends Vue {
  private readonly tagContext = tagModule.context(this.$store);
  private readonly panelContext = panelModule.context(this.$store);
  private readonly responsiveContext = responsiveModule.context(this.$store);

  @Prop({ type: Number }) readonly expanded?: number;

  private readonly sortByOptions = [
    { id: "name", title: "Name" },
    { id: "mass", title: "Mass" },
  ];

  private sortBy = "name";
  private sortDesc = false;
  private showOnlyMetals = false;
  private search: string | null = null;

  get selectedTag() {
    return this.panelContext.getters.activePanelTagId;
  }

  set selectedTag(value: number | null) {
    this.panelContext.mutations.setActivePanelTagId(value ? value : null);
  }

  get height() {
    return this.expanded === 0
      ? this.responsiveContext.getters.responsive.height! - 752
      : this.responsiveContext.getters.responsive.height! - 390;
  }

  private get tags() {
    let items = this.showOnlyMetals
      ? this.tagContext.getters.tags.filter((item) => item.isMetal)
      : this.tagContext.getters.tags;
    if (this.search) {
      const normalizedSearch = this.search.toLowerCase().trim();
      return items.filter((item) => {
        return item.isMetal
          ? (item.name + item.mw).toLowerCase().includes(normalizedSearch)
          : item.name.toLowerCase().includes(normalizedSearch);
      });
    }
    if (this.sortBy === "name") {
      return this.sortDesc
        ? items.sort((a, b) => b.name.localeCompare(a.name))
        : items.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return this.sortDesc
        ? items.sort((a, b) => {
            if (a.mw === null) {
              return 1;
            }
            if (b.mw === null) {
              return -1;
            }
            return b.mw - a.mw;
          })
        : items.sort((a, b) => {
            if (a.mw === null) {
              return 1;
            }
            if (b.mw === null) {
              return -1;
            }
            return a.mw - b.mw;
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
}
</script>
