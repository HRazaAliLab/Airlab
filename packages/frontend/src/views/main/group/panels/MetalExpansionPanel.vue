<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="panel-header">{{ tag.name + tag.mw }}</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-data-iterator
        v-model="selected"
        :items="conjugates"
        item-key="id"
        :items-per-page="-1"
        hide-default-footer
        disable-pagination
        @item-selected="itemSelected"
      >
        <template v-slot:default="{ items, isSelected, select }">
          <v-row>
            <v-card
              v-for="item in items"
              :key="item.id"
              outlined
              width="180"
              class="ma-1 pa-0"
              @click.prevent="isSelected(item) ? select(item, false) : select(item, true)"
              :color="getConjugateColor(item, isSelected(item))"
            >
              <v-card-text class="header"> <span class="subheader">Lot:</span> {{ item.lot.number }} </v-card-text>
              <v-card-text class="content">
                <div v-if="item.lot && item.lot.clone && item.lot.clone.protein">
                  <span class="subheader">Protein:</span> {{ item.lot.clone.protein.name }}
                </div>
                <div v-if="item.lot && item.lot.clone">
                  <span class="subheader">Clone:</span> {{ item.lot.clone.name }}
                </div>
                <div v-if="item.tubeNumber"><span class="subheader">Tube #:</span> {{ item.tubeNumber }}</div>
                <div v-if="item.concentration">
                  <span class="subheader">Concentration:</span> {{ item.concentration }}
                </div>
                <div v-if="item.description"><span class="subheader">Description:</span> {{ item.description }}</div>
              </v-card-text>
            </v-card>
          </v-row>
        </template>
      </v-data-iterator>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { conjugateModule } from "@/modules/conjugate";
import { TagDto } from "@airlab/shared/lib/tag/dto";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";

@Component
export default class CreatePanel extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly conjugateContext = conjugateModule.context(this.$store);

  @Prop(Object) tag!: TagDto;
  @Prop(Object) initialState?: object;
  @Prop(Function) onSelected;
  @Prop(Boolean) showEmpty!: boolean;

  selected: any[] = [];

  get conjugates() {
    let items = this.conjugateContext.getters.getConjugatesForTag(this.tag.id);
    if (!this.showEmpty) {
      items = items.filter(item => item.status !== 2);
    }
    return items;
  }

  itemSelected({ item, value }) {
    this.onSelected(this.tag.id, item, value);
  }

  @Watch("initialState")
  initialStateChanged(state) {
    this.selected = state && state[this.tag.id] ? state[this.tag.id] : [];
  }

  getConjugateColor(conjugate: ConjugateDto, isSelected: boolean) {
    const isOver = conjugate.status === 2;
    const isLow = conjugate.status === 1;
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
