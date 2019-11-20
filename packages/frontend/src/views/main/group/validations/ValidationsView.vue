<template>
  <LoadingView v-if="!items" text="Loading validations..." />
  <v-col v-else>
    <v-toolbar class="toolbar">
      <v-toolbar-title>
        Validations
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text @click="exportCsv()">Export CSV</v-btn>
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
        :items-per-page="15"
        :footer-props="{
          itemsPerPageOptions: [10, 15, 20, -1],
          showFirstLastPage: true,
          showCurrentPage: true,
        }"
        multi-sort
        show-expand
      >
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
            <v-card flat tile class="my-2">
              <v-card-title>
                {{ item.id }}
              </v-card-title>
              <v-card-text>
                <div><strong>Positive control:</strong> {{ item.positiveControl }}</div>
                <div><strong>Negative control:</strong> {{ item.negativeControl }}</div>
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
import { saveAs } from "file-saver";

@Component({
  components: {
    LoadingView,
  },
})
export default class ValidationsViews extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly validationContext = validationModule.context(this.$store);
  readonly speciesContext = speciesModule.context(this.$store);

  readonly applications = [
    { id: 0, name: "SMC" },
    { id: 1, name: "IMC" },
    { id: 2, name: "FC" },
    { id: 3, name: "IF" },
    { id: 4, name: "IHC" },
  ];

  readonly statuses = [
    { id: 0, name: "Yes" },
    { id: 1, name: "So-So" },
    { id: 2, name: "No" },
    { id: 3, name: "Undefined" },
  ];

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
    },
    {
      text: "Species",
      value: "species.name",
    },
    {
      text: "Clone",
      value: "clone.name",
    },
    {
      text: "Protein",
      value: "clone.protein.name",
    },
    {
      text: "Lot",
      value: "lot.id",
    },
    {
      text: "Conjugate",
      value: "conjugate.id",
    },
    {
      text: "Created by",
      value: "user.name",
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

  async exportCsv() {
    const csv = this.validationContext.getters.getCsv(this.items);
    const blob = new Blob([csv], { type: "text/csv" });
    saveAs(blob, "validations.csv");
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
