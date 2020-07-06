<template>
  <v-card tile>
    <v-card-title class="panel-header">{{ tag.name + (tag.isMetal ? tag.mw : ``) }}</v-card-title>
    <v-toolbar flat dense class="mb-2">
      <v-text-field v-model="search" label="Search conjugates" single-line hide-details clearable dense>
        <template v-slot:append-outer>
          <v-icon dense>mdi-magnify</v-icon>
        </template>
      </v-text-field>
      <v-spacer />
      <v-switch v-model="showEmpty" label="Show empty" hide-details inset dense class="ml-2" style="width: 250px;" />
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
      <v-btn-toggle v-model="sortDesc" mandatory>
        <v-btn depressed :value="false" x-small>
          <v-icon x-small>mdi-arrow-up</v-icon>
        </v-btn>
        <v-btn depressed :value="true" x-small>
          <v-icon x-small>mdi-arrow-down</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>
    <v-card-text>
      <v-data-iterator
        :value="selectedConjugates"
        :items="items"
        item-key="id"
        :items-per-page="-1"
        hide-default-footer
        disable-pagination
        disable-filtering
        disable-sort
        @item-selected="
          ({ item, value }) => {
            onSelected(tag.id, item, value);
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
                <div>
                  <span class="subheader">Reactivity: </span>
                  <v-chip v-for="r of item.lot.clone.reactivity" :key="`${Math.random()}`" x-small label class="chip">
                    {{ speciesMap.get(r) ? speciesMap.get(r).acronym : "?" }}
                  </v-chip>
                </div>
              </div>
            </v-sheet>
          </v-row>
        </template>
      </v-data-iterator>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TagDto } from "@airlab/shared/lib/tag/dto";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { SpeciesDto } from "@airlab/shared/lib/species/dto";
import { ConjugateStatus } from "@airlab/shared/lib/conjugate/ConjugateStatus";
import { conjugateModule } from "@/modules/conjugate";
import { speciesModule } from "@/modules/species";

@Component
export default class TagConjugatesView extends Vue {
  private readonly conjugateContext = conjugateModule.context(this.$store);
  private readonly speciesContext = speciesModule.context(this.$store);

  @Prop({ type: Object, required: true }) readonly tag!: TagDto;
  @Prop({ type: Array, required: true }) readonly selectedConjugates!: ConjugateDto[];
  @Prop({ type: Function, required: true }) readonly onSelected;

  private readonly sortByOptions = [
    { id: "tube", title: "Tube" },
    { id: "protein", title: "Protein" },
    { id: "clone", title: "Clone" },
  ];

  private sortBy = "tube";
  private sortDesc = false;

  private showEmpty = false;
  private search: string | null = null;

  private get items() {
    let items = this.conjugateContext.getters.conjugates.filter((item) => item.tagId === this.tag.id);
    items = this.showEmpty ? items : items.filter((item) => item.status !== 2);
    if (this.search !== null) {
      const normalizedSearchTerm = this.search.toLowerCase().trim();
      items = items.filter(
        (item) =>
          (item as any).lot.clone.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 ||
          (item as any).lot.clone.protein.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1
      );
    }
    switch (this.sortBy) {
      case "tube": {
        return this.sortDesc
          ? items.sort((a, b) => b.tubeNumber - a.tubeNumber)
          : items.sort((a, b) => a.tubeNumber - b.tubeNumber);
      }
      case "protein": {
        return this.sortDesc
          ? items.sort((a: any, b: any) => b.lot.clone.protein.name.localeCompare(a.lot.clone.protein.name))
          : items.sort((a: any, b: any) => a.lot.clone.protein.name.localeCompare(b.lot.clone.protein.name));
      }
      case "clone": {
        return this.sortDesc
          ? items.sort((a: any, b: any) => b.lot.clone.name.localeCompare(a.lot.clone.name))
          : items.sort((a: any, b: any) => a.lot.clone.name.localeCompare(b.lot.clone.name));
      }
    }
    return items;
  }

  private get speciesMap() {
    const map = new Map<number, SpeciesDto>();
    for (const s of this.speciesContext.getters.species) {
      map.set(s.id, s);
    }
    return map;
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
.panel-header {
  font-weight: bold;
}
.content {
  font-size: small;
  margin: 8px;
  padding: 0;
}
.subheader {
  font-weight: bold;
}
.chip {
  margin-right: 5px;
}
</style>
