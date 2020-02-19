<template>
  <LoadingView v-if="!items" text="Loading clones..." />
  <v-col v-else>
    <v-toolbar dense class="toolbar">
      <v-toolbar-title>
        Clones
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text @click="exportFile()" color="primary">Export CSV</v-btn>
        <v-btn text :to="`/main/groups/${activeGroupId}/clones/create`" color="primary">Create Clone</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Filter</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-select
            v-model="speciesFilter"
            :items="species"
            item-text="name"
            item-value="id"
            chips
            clearable
            label="Host"
            multiple
            prepend-icon="mdi-filter-outline"
            solo
            dense
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="removeSpeciesFilter(item)"
              >
                {{ item.name }}
              </v-chip>
            </template>
          </v-select>
          <v-select
            v-model="applicationFilter"
            :items="applications"
            item-text="name"
            item-value="id"
            chips
            clearable
            label="Validation Application"
            multiple
            prepend-icon="mdi-filter-outline"
            solo
            dense
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="removeApplicationFilter(item)"
              >
                {{ item.name }}
              </v-chip>
            </template>
          </v-select>
          <v-select
            v-model="statusFilter"
            :items="statuses"
            item-text="name"
            item-value="id"
            chips
            clearable
            label="Validation Status"
            multiple
            prepend-icon="mdi-filter-outline"
            solo
            dense
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="removeStatusFilter(item)"
              >
                {{ item.name }}
              </v-chip>
            </template>
          </v-select>
          <v-select
            v-model="reactivityFilter"
            :items="species"
            item-text="name"
            item-value="id"
            chips
            clearable
            label="Reactivity"
            multiple
            prepend-icon="mdi-filter-outline"
            solo
            dense
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="removeReactivityFilter(item)"
              >
                {{ item.name }}
              </v-chip>
            </template>
          </v-select>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

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
        :custom-filter="filter"
        :items-per-page="15"
        :footer-props="{
          itemsPerPageOptions: [10, 15, 20, 100],
          showFirstLastPage: true,
          showCurrentPage: true,
        }"
        multi-sort
        show-expand
      >
        <template v-slot:item.protein="{ item }">
          <router-link
            v-if="item.protein"
            class="link"
            :to="{
              name: 'main-group-proteins-edit',
              params: {
                groupId: activeGroupId,
                id: item.protein.id,
              },
            }"
          >
            {{ item.protein.name }}
          </router-link>
        </template>
        <template v-slot:item.species="{ item }">
          <router-link
            v-if="item.species"
            class="link"
            :to="{
              name: 'main-group-species-edit',
              params: {
                id: item.species.id,
              },
            }"
          >
            {{ item.species.name }}
          </router-link>
        </template>
        <template v-slot:item.isPhospho="{ item }">
          <v-icon v-if="item.isPhospho">mdi-check</v-icon>
        </template>
        <template v-slot:item.isPolyclonal="{ item }">
          <v-icon v-if="item.isPolyclonal">mdi-check</v-icon>
        </template>
        <template v-slot:item.validations="{ item }">
          <v-chip
            v-for="validation in item.validations"
            :key="validation.id"
            :color="getStatusColor(validation)"
            class="mr-1"
            x-small
            dark
          >
            {{ validation.application | applicationToString }}
          </v-chip>
        </template>
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                :to="{
                  name: 'main-group-clones-edit',
                  params: {
                    groupId: activeGroupId,
                    id: item.id,
                  },
                }"
              >
                <v-icon color="grey">mdi-pencil-outline</v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon @click="deleteClone(item.id)">
                <v-icon color="red accent-1">mdi-delete-outline</v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
          <v-btn text color="primary" @click.stop="showDetails(item)">
            Details
          </v-btn>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-card flat tile class="my-2">
              <v-card-actions>
                <v-btn text color="primary" target="_blank" :href="citeAb(item)">CiteAb</v-btn>
                <v-btn text color="primary" target="_blank" :href="antibodyRegistry(item)">AntibodyRegistry</v-btn>
                <v-btn text color="primary" target="_blank" :href="antibodyPedia(item)">AntibodyPedia</v-btn>
              </v-card-actions>
              <v-card-text>
                <v-row v-if="item.epitope">
                  <v-col cols="1" class="subtitle-2">
                    Epitope
                  </v-col>
                  <v-col>
                    {{ item.epitope }}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </td>
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
import { cloneModule } from "@/modules/clone";
import { CloneDto } from "@airlab/shared/lib/clone/dto";
import { speciesModule } from "@/modules/species";
import { exportCsv } from "@/utils/exporters";
import CloneDetailsView from "@/views/main/group/clones/CloneDetailsView.vue";
import { getStatusColor } from "@/utils/converters";
import { applicationEnum, statusEnum } from "@/utils/enums";

@Component({
  components: {
    CloneDetailsView,
    LoadingView,
  },
})
export default class ClonesView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly cloneContext = cloneModule.context(this.$store);
  readonly speciesContext = speciesModule.context(this.$store);

  readonly getStatusColor = getStatusColor;
  readonly applications = applicationEnum;
  readonly statuses = statusEnum;

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
      text: "Protein",
      value: "protein",
      sort: (a, b) => a.name.localeCompare(b.name),
    },
    {
      text: "Host",
      value: "species",
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
      text: "Isotype",
      value: "isotype",
    },
    {
      text: "Phospho",
      value: "isPhospho",
      filterable: false,
    },
    {
      text: "Polyclonal",
      value: "isPolyclonal",
      filterable: false,
    },
    {
      text: "Validations",
      value: "validations",
      filterable: false,
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
  detailsItem: CloneDto | null = null;
  search = "";

  speciesFilter: number[] = [];
  applicationFilter: number[] = [];
  statusFilter: number[] = [];
  reactivityFilter: number[] = [];

  get species() {
    return this.speciesContext.getters.species;
  }

  get items() {
    let items = this.cloneContext.getters.clones;
    if (this.speciesFilter.length > 0) {
      items = items.filter(item =>
        (item as any).species ? this.speciesFilter.includes((item as any).species.id) : false
      );
    }
    if (this.applicationFilter.length > 0) {
      items = items.filter(item => {
        for (const validation of (item as any).validations) {
          if (this.applicationFilter.includes(validation.application)) {
            return true;
          }
        }
        return false;
      });
    }
    if (this.statusFilter.length > 0) {
      items =
        this.applicationFilter.length > 0
          ? items.filter(item => {
              for (const validation of (item as any).validations) {
                if (
                  this.applicationFilter.includes(validation.application) &&
                  this.statusFilter.includes(validation.status)
                ) {
                  return true;
                }
              }
              return false;
            })
          : items.filter(item => {
              for (const validation of (item as any).validations) {
                if (this.statusFilter.includes(validation.status)) {
                  return true;
                }
              }
              return false;
            });
    }
    if (this.reactivityFilter.length > 0) {
      items = items.filter(item => item.reactivity.some(element => this.reactivityFilter.includes(element)));
    }
    return items;
  }

  filter(value, search, item) {
    if (!search) {
      return true;
    }
    const normalizedSearchTerm = search.toLowerCase().trim();
    return (
      item.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 ||
      (item.protein ? item.protein.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.species ? item.species.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.isotype ? item.isotype.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false)
    );
  }

  showDetails(item: CloneDto) {
    this.detailsItem = item;
    this.drawer = !this.drawer;
  }

  citeAb(clone: CloneDto) {
    return `https://www.citeab.com/antibodies/search?q=${clone.name}`;
  }

  antibodyRegistry(clone: CloneDto) {
    return `https://www.antibodyregistry.org/search?q=${(clone as any).protein ? (clone as any).protein.name : ""}%20${
      clone.name
    }`;
  }

  antibodyPedia(clone: CloneDto) {
    return `https://www.antibodypedia.com/explore/${(clone as any).protein ? (clone as any).protein.name : ""}+${
      clone.name
    }`;
  }

  async mounted() {
    await Promise.all([
      this.cloneContext.actions.getGroupClones(+this.$router.currentRoute.params.groupId),
      this.speciesContext.actions.getGroupSpecies(+this.$router.currentRoute.params.groupId),
    ]);
  }

  async deleteClone(id: number) {
    if (self.confirm("Are you sure you want to delete the clone?")) {
      await this.cloneContext.actions.deleteClone(id);
    }
  }

  removeSpeciesFilter(item) {
    this.speciesFilter.splice(this.speciesFilter.indexOf(item), 1);
    this.speciesFilter = [...this.speciesFilter];
  }

  removeApplicationFilter(item) {
    this.applicationFilter.splice(this.applicationFilter.indexOf(item), 1);
    this.applicationFilter = [...this.applicationFilter];
  }

  removeStatusFilter(item) {
    this.statusFilter.splice(this.statusFilter.indexOf(item), 1);
    this.statusFilter = [...this.statusFilter];
  }

  removeReactivityFilter(item) {
    this.reactivityFilter.splice(this.reactivityFilter.indexOf(item), 1);
    this.reactivityFilter = [...this.reactivityFilter];
  }

  exportFile() {
    const csv = this.cloneContext.getters.getCsv(this.items);
    exportCsv(csv, "clones.csv");
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
