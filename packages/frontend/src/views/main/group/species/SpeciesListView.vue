<template>
  <v-col>
    <v-toolbar dense class="toolbar">
      <v-toolbar-title>Species</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text :to="`/main/groups/${activeGroupId}/species/create`" color="primary">Create Species</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-card>
      <v-card-title>
        <v-spacer />
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details clearable />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :loading="!items"
        :search="search"
        :items-per-page="15"
        :footer-props="{
          itemsPerPageOptions: [10, 15, 20, -1],
          showFirstLastPage: true,
          showCurrentPage: true,
        }"
        multi-sort
        show-expand
      >
        <template v-slot:item.action="{ item }">
          <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item
                :to="{
                  name: 'main-group-species-edit',
                  params: {
                    groupId: activeGroupId,
                    id: item.id,
                  },
                }"
              >
                <v-list-item-icon>
                  <v-icon color="grey">mdi-pencil-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
<!--              <v-list-item v-if="isGroupAdmin" @click="deleteSpecies(item.id)">-->
<!--                <v-list-item-icon>-->
<!--                  <v-icon color="red accent-1">mdi-delete-outline</v-icon>-->
<!--                </v-list-item-icon>-->
<!--                <v-list-item-content>-->
<!--                  <v-list-item-title>Delete</v-list-item-title>-->
<!--                </v-list-item-content>-->
<!--              </v-list-item>-->
            </v-list>
          </v-menu>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon @click.stop="showDetails(item)">
                <v-icon>mdi-information-outline</v-icon>
              </v-btn>
            </template>
            <span>Show details</span>
          </v-tooltip>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <SpeciesExpandedView :species="item" />
          </td>
        </template>
      </v-data-table>
    </v-card>
    <v-navigation-drawer v-model="drawer" right fixed temporary width="400">
      <SpeciesDetailsView v-if="drawer" :species="detailsItem" />
    </v-navigation-drawer>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { speciesModule } from "@/modules/species";
import { groupModule } from "@/modules/group";
import { SpeciesDto } from "@airlab/shared/lib/species/dto";
import SpeciesDetailsView from "@/views/main/group/species/SpeciesDetailsView.vue";
import SpeciesExpandedView from "@/views/main/group/species/SpeciesExpandedView.vue";

@Component({
  components: { SpeciesExpandedView, SpeciesDetailsView },
})
export default class SpeciesListView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly speciesContext = speciesModule.context(this.$store);

  readonly headers = [
    // {
    //   text: "Id",
    //   sortable: true,
    //   value: "id",
    //   align: "right",
    //   filterable: false,
    //   width: "80",
    // },
    {
      text: "Name",
      sortable: true,
      value: "name",
      align: "left",
    },
    {
      text: "Acronym",
      sortable: true,
      value: "acronym",
      align: "left",
    },
    {
      text: "Actions",
      value: "action",
      sortable: false,
      filterable: false,
      width: "105",
    },
    {
      text: "",
      value: "data-table-expand",
    },
  ];

  drawer = false;
  detailsItem: SpeciesDto | null = null;
  search = "";

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get isGroupAdmin() {
    return this.groupContext.getters.isGroupAdmin;
  }

  get items() {
    return this.speciesContext.getters.species;
  }

  showDetails(item: SpeciesDto) {
    this.detailsItem = item;
    this.drawer = !this.drawer;
  }

  async mounted() {
    document.onkeydown = (evt) => {
      if (this.drawer && evt.key === "Escape") {
        this.drawer = false;
      }
    };
    await this.speciesContext.actions.getGroupSpecies(+this.$router.currentRoute.params.groupId);
  }

  async deleteSpecies(id: number) {
    if (self.confirm("Are you sure you want to delete the species?")) {
      if (self.confirm("All children entities will be deleted!")) {
        await this.speciesContext.actions.deleteSpecies(id);
      }
    }
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
