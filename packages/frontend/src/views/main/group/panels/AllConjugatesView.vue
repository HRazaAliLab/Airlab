<template>
  <v-card tile>
    <v-toolbar flat dense class="mb-2">
      <v-text-field v-model="search" label="Search conjugates" single-line hide-details clearable dense>
        <template v-slot:append-outer>
          <v-icon dense>mdi-magnify</v-icon>
        </template>
      </v-text-field>
      <v-switch v-model="showEmpty" label="Show empty" hide-details inset dense class="ml-2" style="width: 200px" />
      <v-spacer />
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
      <v-btn-toggle v-model="sortDesc" mandatory dense>
        <v-btn depressed :value="false" x-small>
          <v-icon x-small>mdi-arrow-up</v-icon>
        </v-btn>
        <v-btn depressed :value="true" x-small>
          <v-icon x-small>mdi-arrow-down</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>
    <v-card-text>
      <div v-for="item in tagMap.keys()">
        <v-card-subtitle class="tag-header">
          {{
            tagContext.getters.getTag(item).isMetal
              ? tagContext.getters.getTag(item).name + tagContext.getters.getTag(item).mw
              : tagContext.getters.getTag(item).name
          }}
        </v-card-subtitle>
        <v-data-iterator
          :value="selectedConjugates"
          :items="tagMap.get(item)"
          item-key="id"
          :items-per-page="-1"
          hide-default-footer
          disable-pagination
          disable-filtering
          disable-sort
          @item-selected="
            ({ item, value }) => {
              onSelected(item.tag.id, item, value);
            }
          "
        >
          <template v-slot:default="{ items, isSelected, select }">
            <v-row>
              <v-sheet
                v-for="item in items"
                :key="item.id"
                tile
                width="180"
                class="ma-1 pa-0"
                @click.prevent="isSelected(item) ? select(item, false) : select(item, true)"
                :color="getConjugateColor(item, isSelected(item))"
              >
                <div class="content">
                  <div><span class="subheader">Tube:</span> {{ item.tubeNumber }}</div>
                  <div><span class="subheader">Protein:</span> {{ item.lot.clone.protein.name }}</div>
                  <div><span class="subheader">Clone:</span> {{ item.lot.clone.name }}</div>
                </div>
              </v-sheet>
            </v-row>
          </template>
        </v-data-iterator>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { ConjugateStatus } from "@airlab/shared/lib/conjugate/ConjugateStatus";
import { conjugateModule } from "@/modules/conjugate";
import { tagModule } from "@/modules/tag";

@Component
export default class AllConjugatesView extends Vue {
  private readonly conjugateContext = conjugateModule.context(this.$store);
  private readonly tagContext = tagModule.context(this.$store);

  @Prop({ type: Array, required: false }) readonly selectedConjugates!: ConjugateDto[];
  @Prop({ type: Function, required: true }) readonly onSelected;

  private readonly sortByOptions = [
    { id: "protein", title: "Protein" },
    { id: "clone", title: "Clone" },
    { id: "tube", title: "Tube" },
  ];

  private sortBy = "protein";
  private sortDesc = false;

  private showEmpty = false;
  private search: string | null = null;

  private get tagMap() {
    const tagMap = new Map<number, ConjugateDto[]>();
    for (const item of this.items) {
      if (!tagMap.has(item.tagId)) {
        tagMap.set(item.tagId, []);
      }
      const tagConjugates = tagMap.get(item.tagId);
      tagConjugates!.push(item);
    }
    return tagMap;
  }

  private get items() {
    let items = this.conjugateContext.getters.conjugates;
    items = this.showEmpty ? items : items.filter((item) => item.status !== 2);
    if (this.search !== null && this.search.length >= 3) {
      const normalizedSearchTerm = this.search.toLowerCase().trim();
      items = items.filter(
        (item) =>
          (item as any).lot.clone.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 ||
          (item as any).lot.clone.protein.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1
      );
    }

    switch (this.sortBy) {
      case "tube": {
        items = this.sortDesc
          ? items.sort((a, b) => b.tubeNumber - a.tubeNumber)
          : items.sort((a, b) => a.tubeNumber - b.tubeNumber);
        break;
      }
      case "protein": {
        items = this.sortDesc
          ? items.sort((a: any, b: any) => b.lot.clone.protein.name.localeCompare(a.lot.clone.protein.name))
          : items.sort((a: any, b: any) => a.lot.clone.protein.name.localeCompare(b.lot.clone.protein.name));
        break;
      }
      case "clone": {
        items = this.sortDesc
          ? items.sort((a: any, b: any) => b.lot.clone.name.localeCompare(a.lot.clone.name))
          : items.sort((a: any, b: any) => a.lot.clone.name.localeCompare(b.lot.clone.name));
        break;
      }
    }
    return items;
  }

  getConjugateColor(conjugate: ConjugateDto, isSelected: boolean) {
    const isOver = conjugate.status === ConjugateStatus.Finished;
    const isLow = conjugate.status === ConjugateStatus.Low;
    if (isSelected) {
      if (isOver) {
        return "red";
      }
      if (isLow) {
        return "yellow";
      }
      return "blue lighten-2";
    }
    if (isOver) {
      return "red lighten-5";
    }
    if (isLow) {
      return "yellow lighten-5";
    }
    return "default";
  }
}
</script>

<style scoped>
.content {
  font-size: small;
  margin: 8px;
  padding: 0;
}
.subheader {
  font-weight: bold;
}
.tag-header {
  background-color: #81d4fa;
  font-weight: bold;
}
</style>
