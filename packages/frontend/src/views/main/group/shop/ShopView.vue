<template>
  <LoadingView v-if="!items" text="Loading shop..." />
  <v-col v-else>
    <v-toolbar dense class="toolbar">
      <v-toolbar-title>
        Shop
      </v-toolbar-title>
      <v-spacer />
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        hide-details
        clearable
        solo
        flat
        dense
      />
      <v-btn text @click="doSearch()" color="primary">Search</v-btn>
    </v-toolbar>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :items-per-page="15"
        :footer-props="{
          itemsPerPageOptions: [10, 15, 20, 100],
          showFirstLastPage: true,
          showCurrentPage: true,
        }"
        multi-sort
        show-expand
      >
        <template v-slot:item.action="{ item }">
          <v-btn text color="primary" @click.stop="showDetails(item)">
            Details
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-navigation-drawer v-model="drawer" right fixed temporary width="600">
      <CloneDetailsView v-if="drawer" :item="detailsItem" />
    </v-navigation-drawer>
  </v-col>
</template>

<script lang="ts">
import LoadingView from "@/components/LoadingView.vue";
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import CloneDetailsView from "@/views/main/group/clones/CloneDetailsView.vue";
import { shopModule } from "@/modules/shop";

@Component({
  components: {
    CloneDetailsView,
    LoadingView,
  },
})
export default class ShopView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly shopContext = shopModule.context(this.$store);

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  readonly headers = [
    {
      text: "Id",
      value: "id",
      align: "end",
      filterable: false,
      width: "80",
    },
    {
      text: "Name",
      value: "name",
    },
    {
      text: "Actions",
      value: "action",
      sortable: false,
      filterable: false,
      width: "210",
    },
  ];

  drawer = false;
  detailsItem: any | null = null;
  search = "";

  get items() {
    return [];
  }

  showDetails(item: any) {
    this.detailsItem = item;
    this.drawer = !this.drawer;
  }

  async doSearch() {
    const result = await this.shopContext.actions.searchAntibody(this.search);
    console.log(result);
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
.link {
  text-decoration: none;
}
</style>
