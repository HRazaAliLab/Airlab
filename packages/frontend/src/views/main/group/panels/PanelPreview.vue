<template>
  <v-sheet elevation="2">
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="-1"
      hide-default-footer
      disable-filtering
      disable-pagination
      dense
      fixed-header
      :height="height"
      @click:row="clickRow"
    >
      <template v-slot:item.tag="{ item }">
        <span :class="item.status === 2 ? 'empty' : item.status === 1 ? 'low' : ''">{{ item.tag.name }}</span>
      </template>
      <template v-slot:item.mass="{ item }">
        <span :class="item.status === 2 ? 'empty' : item.status === 1 ? 'low' : ''">{{ item.tag.mw }}</span>
      </template>
      <template v-slot:item.lot.clone.protein="{ item }">
        <span :class="item.status === 2 ? 'empty' : item.status === 1 ? 'low' : ''">{{
          item.lot.clone.protein.name
        }}</span>
      </template>
      <template v-slot:item.lot.clone="{ item }">
        <span :class="item.status === 2 ? 'empty' : item.status === 1 ? 'low' : ''">{{ item.lot.clone.name }}</span>
      </template>
      <template v-slot:item.tubeNumber="{ item }">
        <span :class="item.status === 2 ? 'empty' : item.status === 1 ? 'low' : ''">{{ item.tubeNumber }}</span>
      </template>
    </v-data-table>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { panelModule } from "@/modules/panel";
import { responsiveModule } from "@/modules/responsive";

@Component
export default class PanelPreview extends Vue {
  readonly panelContext = panelModule.context(this.$store);
  readonly responsiveContext = responsiveModule.context(this.$store);

  @Prop({ type: Map, required: true }) readonly conjugates!: Map<number, Set<ConjugateDto>>;
  @Prop({ type: Number }) readonly expanded?: number;

  private items: ConjugateDto[] = [];

  get height() {
    return this.expanded === 0 // expanded
      ? this.responsiveContext.getters.responsive.height! - 542
      : this.responsiveContext.getters.responsive.height! - 182;
  }

  @Watch("conjugates")
  conjugatesChanged(value: Map<number, Set<ConjugateDto>>) {
    let output: ConjugateDto[] = [];
    value.forEach((v, k) => {
      output = output.concat(Array.from(v));
    });
    this.items = output;
  }

  readonly headers = [
    {
      text: "Tag",
      value: "tag",
      sort: (a, b) => {
        if (a === null) {
          return 1;
        }
        if (b === null) {
          return -1;
        }
        return a.name.localeCompare(b.name);
      },
    },
    {
      text: "Mass",
      value: "tag.mw",
      align: "end",
      sort: (a, b) => {
        if (a === null) {
          return 1;
        }
        if (b === null) {
          return -1;
        }
        return a - b;
      },
    },
    {
      text: "Protein",
      value: "lot.clone.protein",
      sort: (a, b) => {
        if (a === null) {
          return 1;
        }
        if (b === null) {
          return -1;
        }
        return a.name.localeCompare(b.name);
      },
    },
    {
      text: "Clone",
      value: "lot.clone",
      sort: (a, b) => {
        if (a === null) {
          return 1;
        }
        if (b === null) {
          return -1;
        }
        return a.name.localeCompare(b.name);
      },
    },
    {
      text: "Tube",
      value: "tubeNumber",
      align: "end",
    },
  ];

  clickRow(row) {
    this.panelContext.mutations.setActivePanelTagId(row.tag.id);
  }
}
</script>

<style scoped>
.low {
  color: red;
}
.empty {
  text-decoration: line-through;
}
</style>
