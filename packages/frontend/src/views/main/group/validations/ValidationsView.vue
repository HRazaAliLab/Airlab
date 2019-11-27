<template>
  <LoadingView v-if="!items" text="Loading validations..." />
  <v-col v-else>
    <v-toolbar class="toolbar">
      <v-toolbar-title>
        Validations
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text @click="exportFile()">Export CSV</v-btn>
        <v-btn text :to="`/main/group/${activeGroupId}/validations/create`">Create Validation</v-btn>
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
            label="Species"
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
            label="Application"
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
            label="Status"
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
        <template v-slot:item.species="{ item }">
          <router-link
            v-if="item.species"
            class="link"
            :to="{
              name: 'main-admin-species-edit',
              params: {
                groupId: activeGroupId,
                id: item.species.id,
              },
            }"
          >
            {{ item.species.name }}
          </router-link>
        </template>
        <template v-slot:item.clone="{ item }">
          <router-link
            class="link"
            :to="{
              name: 'main-group-clones-edit',
              params: {
                groupId: activeGroupId,
                id: item.clone.id,
              },
            }"
          >
            {{ item.clone.name }}
          </router-link>
        </template>
        <template v-slot:item.clone.protein="{ item }">
          <router-link
            class="link"
            :to="{
              name: 'main-group-proteins-edit',
              params: {
                groupId: activeGroupId,
                id: item.clone.protein.id,
              },
            }"
          >
            {{ item.clone.protein.name }}
          </router-link>
        </template>
        <template v-slot:item.lot="{ item }">
          <router-link
            v-if="item.lot"
            class="link"
            :to="{
              name: 'main-group-lots-edit',
              params: {
                groupId: activeGroupId,
                id: item.lot.id,
              },
            }"
          >
            {{ item.lot.number }}
          </router-link>
        </template>
        <template v-slot:item.conjugate="{ item }">
          <router-link
            v-if="item.conjugate"
            class="link"
            :to="{
              name: 'main-group-conjugates-edit',
              params: {
                groupId: activeGroupId,
                id: item.conjugate.id,
              },
            }"
          >
            {{ item.conjugate.tubeNumber }}
          </router-link>
        </template>
        <template v-slot:item.user="{ item }">
          <router-link
            class="link"
            :to="{
              name: 'main-admin-user-edit',
              params: {
                groupId: activeGroupId,
                id: item.user.id,
              },
            }"
          >
            {{ item.user.name }}
          </router-link>
        </template>
        <template v-slot:item.application="{ item }">
          {{ item.application | applicationToString }}
        </template>
        <template v-slot:item.status="{ item }">
          <v-tooltip v-if="item.status === 0" bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" color="green">mdi-check-circle-outline</v-icon>
            </template>
            <span>Yes</span>
          </v-tooltip>
          <v-tooltip v-if="item.status === 1" bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" color="orange">mdi-circle-outline</v-icon>
            </template>
            <span>So-So</span>
          </v-tooltip>
          <v-tooltip v-if="item.status === 2" bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" color="red">mdi-cancel</v-icon>
            </template>
            <span>No</span>
          </v-tooltip>
          <v-tooltip v-if="item.status === 3" bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-help-circle-outline</v-icon>
            </template>
            <span>Undefined</span>
          </v-tooltip>
        </template>
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                :to="{
                  name: 'main-group-validations-edit',
                  params: {
                    groupId: activeGroupId,
                    id: item.id,
                  },
                }"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon @click="deleteValidation(item.id)">
                <v-icon color="red accent-1">mdi-delete</v-icon>
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
            <v-card flat tile class="my-2" style="width:100%; height:600px;">
              <v-card-title>
                {{ item.id }}
              </v-card-title>
              <v-card-text>
                <div><strong>Positive control:</strong> {{ item.positiveControl }}</div>
                <div><strong>Negative control:</strong> {{ item.negativeControl }}</div>
                <div v-for="file in item.validationFiles" :key="file.id">
                  <iframe :src="`${apiUrl}/validationFile/${file.id}/serve`" allowfullscreen class="iframe" />
                  <a target="_blank" :href="`${apiUrl}/validationFile/${file.id}/serve`">{{
                    apiUrl + "/validationFile/" + file.id + "/serve"
                  }}</a>
                </div>
              </v-card-text>
            </v-card>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <v-navigation-drawer v-if="detailsItem" v-model="drawer" right fixed temporary width="400">
      <v-card flat>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>mdi-information-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ detailsItem.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-card-text>
          {{ detailsItem }}
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
  </v-col>
</template>

<script lang="ts">
import LoadingView from "@/components/LoadingView.vue";
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { validationModule } from "@/modules/validation";
import { ValidationDto } from "@airlab/shared/lib/validation/dto";
import { speciesModule } from "@/modules/species";
import { apiUrl } from "@/env";
import { exportCsv } from "@/utils/exporters";
import { applicationEnum, statusEnum } from "@/utils/enums";
import { applicationToString } from "@/utils/converters";

@Component({
  components: {
    LoadingView,
  },
})
export default class ValidationsViews extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly validationContext = validationModule.context(this.$store);
  readonly speciesContext = speciesModule.context(this.$store);

  readonly apiUrl = apiUrl;
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
      text: "Application",
      value: "application",
      filterable: false,
      sort: (a, b) => {
        if (a === null) {
          return 1;
        }
        if (b === null) {
          return -1;
        }
        return applicationToString(a).localeCompare(applicationToString(b));
      },
    },
    {
      text: "Species",
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
      text: "Clone",
      value: "clone",
      sort: (a, b) => a.name.localeCompare(b.name),
    },
    {
      text: "Protein",
      value: "clone.protein",
      sort: (a, b) => a.name.localeCompare(b.name),
    },
    {
      text: "Lot",
      value: "lot",
      sort: (a, b) => {
        if (a === null) {
          return 1;
        }
        if (b === null) {
          return -1;
        }
        return a.number.localeCompare(b.number);
      },
    },
    {
      text: "Conjugate",
      value: "conjugate",
      sort: (a, b) => {
        if (a === null) {
          return 1;
        }
        if (b === null) {
          return -1;
        }
        return a.tubeNumber > b.tubeNumber ? 1 : -1;
      },
    },
    {
      text: "Created by",
      value: "user",
      sort: (a, b) => a.name.localeCompare(b.name),
    },
    {
      text: "Status",
      value: "status",
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
  detailsItem: ValidationDto | null = null;
  search = "";

  speciesFilter: number[] = [];
  applicationFilter: number[] = [];
  statusFilter: number[] = [];

  get items() {
    let items = this.validationContext.getters.validations;
    if (this.speciesFilter.length > 0) {
      items = items.filter(item =>
        (item as any).species ? this.speciesFilter.includes((item as any).species.id) : false
      );
    }
    if (this.applicationFilter.length > 0) {
      items = items.filter(item => this.applicationFilter.includes(item.application));
    }
    if (this.statusFilter.length > 0) {
      items = items.filter(item => this.statusFilter.includes(item.status));
    }
    return items;
  }

  get species() {
    return this.speciesContext.getters.species;
  }

  filter(value, search, item) {
    if (!search) {
      return true;
    }
    const normalizedSearchTerm = search.toLowerCase().trim();
    return (
      (item.species ? item.species.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.clone ? item.clone.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.lot ? item.lot.number.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.conjugate ? item.conjugate.tubeNumber.toString().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.user ? item.user.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.clone ? item.clone.protein.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false)
    );
  }

  showDetails(item: ValidationDto) {
    this.detailsItem = item;
    this.drawer = !this.drawer;
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

  async mounted() {
    await Promise.all([this.validationContext.actions.getValidations(), this.speciesContext.actions.getSpecies()]);
  }

  async deleteValidation(id: number) {
    if (self.confirm("Are you sure you want to delete the validation?")) {
      await this.validationContext.actions.deleteValidation(id);
    }
  }

  exportFile() {
    const csv = this.validationContext.getters.getCsv(this.items);
    exportCsv(csv, "validations.csv");
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
.iframe {
  width: 100%;
  height: 400px;
  border: 0;
}
</style>
