<template>
  <LoadingView v-if="!items" text="Loading lots..." />
  <v-col v-else>
    <v-toolbar dense class="toolbar">
      <v-toolbar-title>Lots</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text @click="exportFile()" color="primary">Export CSV</v-btn>
        <v-btn text :to="`/main/groups/${activeGroupId}/lots/create`" color="primary">Create Lot</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Filter</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-select
            v-model="statusFilter"
            :items="statuses"
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
                {{ item.text }}
              </v-chip>
            </template>
          </v-select>
          <v-select
            v-model="providerFilter"
            :items="providers"
            item-text="name"
            item-value="id"
            chips
            clearable
            label="Provider"
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
                @click:close="removeProviderFilter(item)"
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
        <template v-slot:item.provider="{ item }">
          <router-link
            v-if="item.provider"
            class="link"
            :to="{
              name: 'main-group-providers-edit',
              params: {
                groupId: activeGroupId,
                id: item.provider.id,
              },
            }"
          >
            {{ item.provider.name }}
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
        <template v-slot:item.status="{ item }">
          <v-chip :color="getLotStatusColor(item.status)" class="mr-1" small dark label>
            {{ item.status | lotStatusToString }}
          </v-chip>
        </template>
        <template v-slot:item.action="{ item }">
          <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item v-if="item.status !== 0" @click="updateLotStatus(item.id, 0)">
                <v-list-item-icon>
                  <v-icon color="primary">mdi-flask-empty-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Mark as Requested</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="item.status !== 1 && isGroupAdmin" @click="updateLotStatus(item.id, 1)">
                <v-list-item-icon>
                  <v-icon color="primary">mdi-flask-empty-plus-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Mark as Approved</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="item.status !== 2 && isGroupAdmin" @click="updateLotStatus(item.id, 2)">
                <v-list-item-icon>
                  <v-icon color="primary">mdi-flask-empty-minus-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Mark as Rejected</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="item.status !== 3 && isGroupAdmin" @click="updateLotStatus(item.id, 3)">
                <v-list-item-icon>
                  <v-icon color="primary">mdi-flask-empty-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Mark as Ordered</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="item.status !== 4 && isGroupAdmin" @click="updateLotStatusAndNumber(item.id, 4)">
                <v-list-item-icon>
                  <v-icon color="green">mdi-flask-empty</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Mark as Stock</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="item.status !== 5" @click="updateLotStatus(item.id, 5)">
                <v-list-item-icon>
                  <v-icon color="orange">mdi-speedometer-slow</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Mark as Low</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="item.status !== 6" @click="updateLotStatus(item.id, 6)">
                <v-list-item-icon>
                  <v-icon color="red accent-1">mdi-flask-empty-remove-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Mark as Finished</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
              <v-list-item
                :to="{
                  name: 'main-group-conjugates-create',
                  params: {
                    groupId: activeGroupId,
                    lotId: item.id,
                  },
                }"
              >
                <v-list-item-icon>
                  <v-icon color="primary">mdi-plus-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Add Conjugate</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                :to="{
                  name: 'main-group-validations-create',
                  params: {
                    groupId: activeGroupId,
                    cloneId: item.cloneId,
                    lotId: item.id,
                  },
                }"
              >
                <v-list-item-icon>
                  <v-icon color="primary">mdi-plus-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Add Validation</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
              <v-list-item
                :to="{
                  name: 'main-group-lots-edit',
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
              <v-list-item v-if="isGroupAdmin" @click="updateLotArchiveState(item.id, !item.isArchived)">
                <v-list-item-icon>
                  <v-icon color="red accent-1">{{
                    item.isArchived ? "mdi-archive-arrow-up-outline" : "mdi-archive-arrow-down-outline"
                  }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.isArchived ? "Unarchive" : "Archive" }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="isGroupAdmin" @click="deleteLot(item.id)">
                <v-list-item-icon>
                  <v-icon color="red accent-1">mdi-delete-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
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
            <LotExpandedView :lot="item" />
          </td>
        </template>
      </v-data-table>
    </v-card>
    <v-navigation-drawer v-model="drawer" right fixed temporary width="400">
      <LotDetailsView v-if="drawer" :lot="detailsItem" />
    </v-navigation-drawer>
  </v-col>
</template>

<script lang="ts">
import LoadingView from "@/components/LoadingView.vue";
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { lotModule } from "@/modules/lot";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import LotDetailsView from "@/views/main/group/lots/LotDetailsView.vue";
import { providerModule } from "@/modules/provider";
import LotExpandedView from "@/views/main/group/lots/LotExpandedView.vue";
import { getLotStatusColor } from "@/utils/converters";
import { LotStatus } from "@airlab/shared/lib/lot/LotStatus";
import { exportCsv } from "@/utils/exporters";

@Component({
  components: {
    LotExpandedView,
    LotDetailsView,
    LoadingView,
  },
})
export default class LotsListView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly lotContext = lotModule.context(this.$store);
  readonly providerContext = providerModule.context(this.$store);

  private readonly getLotStatusColor = getLotStatusColor;

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get isGroupAdmin() {
    return this.groupContext.getters.isGroupAdmin;
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
      text: "Number",
      value: "number",
    },
    {
      text: "Reference",
      value: "reference",
    },
    {
      text: "Provider",
      value: "provider",
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
      text: "Status",
      value: "status",
      filterable: false,
    },
    // {
    //   text: "Purpose",
    //   value: "purpose",
    // },
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
  detailsItem: LotDto | null = null;
  search = "";

  statusFilter: number[] = [];
  providerFilter: number[] = [];

  private readonly statuses = [
    { value: 0, text: "Requested" },
    { value: 1, text: "Approved" },
    { value: 2, text: "Rejected" },
    { value: 3, text: "Ordered" },
    { value: 4, text: "Stock" },
    { value: 5, text: "Low" },
    { value: 6, text: "Finished" },
  ];

  get providers() {
    return this.providerContext.getters.providers.sort((a, b) => a.name.localeCompare(b.name));
  }

  get items() {
    let items = this.lotContext.getters.lots;
    if (this.statusFilter.length > 0) {
      items = items.filter((item) => this.statusFilter.includes(item.status));
    }
    if (this.providerFilter.length > 0) {
      items = items.filter((item) =>
        (item as any).provider ? this.providerFilter.includes((item as any).provider.id) : false
      );
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
      (item.number ? item.number.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.reference ? item.reference.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.provider ? item.provider.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.clone ? item.clone.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.purpose ? item.purpose.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false)
    );
  }

  showDetails(item: LotDto) {
    this.detailsItem = item;
    this.drawer = !this.drawer;
  }

  async mounted() {
    document.onkeydown = (evt) => {
      if (this.drawer && evt.key === "Escape") {
        this.drawer = false;
      }
    };
    await Promise.all([
      this.lotContext.actions.getGroupLots({ groupId: +this.$router.currentRoute.params.groupId }),
      this.providerContext.actions.getGroupProviders(+this.$router.currentRoute.params.groupId),
    ]);
  }

  async deleteLot(id: number) {
    if (self.confirm("Are you sure you want to delete the lot?")) {
      await this.lotContext.actions.deleteLot(id);
    }
  }

  async updateLotArchiveState(id: number, state: boolean) {
    if (self.confirm(`Are you sure you want to ${state ? "archive" : "unarchive"} the lot?`)) {
      await this.lotContext.actions.updateLotArchiveState({ id: id, data: { state: state } });
    }
  }

  async updateLotStatus(id: number, status: LotStatus) {
    if (self.confirm(`Are you sure you want to change the lot status to ${LotStatus[status]}?`)) {
      await this.lotContext.actions.updateLotStatus({ id: id, data: { status: status } });
    }
  }

  async updateLotStatusAndNumber(id: number, status: LotStatus) {
    const lotNumber = self.prompt("Please enter lot number:");
    if (lotNumber) {
      await this.lotContext.actions.updateLotStatus({ id: id, data: { status: status, lotNumber: lotNumber } });
    }
  }

  removeStatusFilter(item) {
    this.statusFilter.splice(this.statusFilter.indexOf(item), 1);
    this.statusFilter = [...this.statusFilter];
  }

  removeProviderFilter(item) {
    this.providerFilter.splice(this.providerFilter.indexOf(item), 1);
    this.providerFilter = [...this.providerFilter];
  }

  exportFile() {
    const csv = this.lotContext.getters.getCsv(this.items);
    exportCsv(csv, "lots.csv");
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
