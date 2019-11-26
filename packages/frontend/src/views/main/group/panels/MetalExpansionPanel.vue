<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="panel-header">{{ tag.name + tag.mw }}</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-data-iterator
        v-model="selected"
        single-select
        :items="conjugates"
        item-key="id"
        :items-per-page="-1"
        :search="search"
        :sort-by="sortBy"
        :sort-desc="sortDesc"
        :custom-filter="filter"
        hide-default-footer
        disable-pagination
      >
        <template v-slot:header>
          <v-toolbar dense class="mb-2">
            <v-text-field
              v-model="search"
              clearable
              flat
              solo
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
              dense
            />
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer />
              <v-select
                v-model="sortBy"
                flat
                solo
                hide-details
                :items="keys"
                item-value="id"
                item-text="title"
                prepend-inner-icon="mdi-sort"
                label="Sort by"
                dense
              />
              <v-spacer />
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn depressed :value="false" small>
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn depressed :value="true" small>
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
              <v-switch v-model="showEmpty" label="Show empty" hide-details inset class="ml-6" />
            </template>
          </v-toolbar>
        </template>

        <template v-slot:default="{ items, isSelected, select }">
          <v-row>
            <v-card
              v-for="item in items"
              :key="item.id"
              outlined
              width="180"
              class="ma-1 pa-0"
              @click.passive="
                e => {
                  select(item);
                  onSelected(tag, item);
                }
              "
              :color="isSelected(item) ? 'blue lighten-5' : 'default'"
            >
              <v-card-text class="header"> <span class="subheader">Lot:</span> {{ item.lot.number }} </v-card-text>
              <v-card-text class="content">
                <div
                  v-if="item.lot && item.lot.clone && item.lot.clone.protein"
                  :class="{ 'blue--text': sortBy === 'protein' }"
                >
                  <span class="subheader">Protein:</span> {{ item.lot.clone.protein.name }}
                </div>
                <div v-if="item.lot && item.lot.clone" :class="{ 'blue--text': sortBy === 'clone' }">
                  <span class="subheader">Clone:</span> {{ item.lot.clone.name }}
                </div>
                <div v-if="item.tubeNumber" :class="{ 'blue--text': sortBy === 'tubeNumber' }">
                  <span class="subheader">Tube #:</span> {{ item.tubeNumber }}
                </div>
                <div v-if="item.concentration" :class="{ 'blue--text': sortBy === 'concentration' }">
                  <span class="subheader">Concentration:</span> {{ item.concentration }}
                </div>
                <div v-if="item.description" :class="{ 'blue--text': sortBy === 'description' }">
                  <span class="subheader">Description:</span> {{ item.description }}
                </div>
              </v-card-text>
            </v-card>
          </v-row>
        </template>
      </v-data-iterator>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { panelModule } from "@/modules/panel";
import { conjugateModule } from "@/modules/conjugate";
import { tagModule } from "@/modules/tag";
import { TagDto } from "@airlab/shared/lib/tag/dto";

@Component
export default class CreatePanel extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly panelContext = panelModule.context(this.$store);
  readonly conjugateContext = conjugateModule.context(this.$store);
  readonly tagContext = tagModule.context(this.$store);

  @Prop(Object) tag!: TagDto;
  @Prop(Function) onSelected;

  readonly keys = [
    { id: "tubeNumber", title: "Tube" },
    { id: "concentration", title: "Concentration" },
    { id: "description", title: "Description" },
  ];

  selected = [];
  search = "";
  sortBy = "tubeNumber";
  sortDesc = false;
  showEmpty = false;

  get conjugates() {
    let items = this.conjugateContext.getters.getConjugatesForTag(this.tag.id);
    if (!this.showEmpty) {
      items = items.filter(item => item.finishedBy > 0);
    }
    return items;
  }

  get selectedConjugationId() {
    return this.selected.length > 0 ? this.selected[0] : undefined;
  }

  filter(items: any[], search: string) {
    if (!search) {
      return items;
    }
    const normalizedSearchTerm = search.toLowerCase().trim();
    return items.filter(item => {
      if (
        item.tubeNumber.toString().indexOf(normalizedSearchTerm) !== -1 ||
        item.concentration.toLowerCase().indexOf(normalizedSearchTerm) !== -1 ||
        (item.description ? item.description.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
        (item.lot ? item.lot.number.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
        (item.lot && item.lot.clone ? item.lot.clone.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
        (item.lot && item.lot.clone && item.lot.clone.protein
          ? item.lot.clone.protein.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1
          : false)
      ) {
        return item;
      }
    });
  }
}
</script>

<style scoped>
.panel-header {
  font-weight: bold;
}
.header {
  font-size: small;
  margin: 8px;
  padding: 0;
}
.content {
  font-size: small;
  margin: 8px;
  padding: 0;
}
.subheader {
  font-weight: bold;
}
</style>
