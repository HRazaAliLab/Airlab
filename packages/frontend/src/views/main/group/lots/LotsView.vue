<template>
  <LoadingView v-if="!items" text="Loading lots..." />
  <v-col v-else>
    <v-toolbar dense class="toolbar">
      <v-toolbar-title>
        Lots
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
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
                {{ item }}
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
            v-if="item.clone"
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
        <template v-slot:item.isLow="{ item }">
          <v-icon v-if="item.isLow">mdi-check</v-icon>
        </template>
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                :to="{
                  name: 'main-group-lots-edit',
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
              <v-btn v-on="on" icon @click="deleteLot(item.id)">
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
              <v-card-title> Name: {{ item.name }} </v-card-title>
              <v-card-text v-if="item.url">
                <a target="_blank" :href="item.url">{{ item.url }}</a>
              </v-card-text>
              <v-timeline dense>
                <v-timeline-item v-if="item.finishedAt" color="red">
                  <div class="py-4">
                    <div class="font-weight-light mb-4">Finished at {{ new Date(item.finishedAt).toUTCString() }}</div>
                    <div v-if="item.finishedBy">by {{ item.finishedBy }}</div>
                  </div>
                </v-timeline-item>
                <v-timeline-item v-if="item.receivedAt" color="orange">
                  <div class="py-4">
                    <div class="font-weight-light mb-4">Received at {{ new Date(item.receivedAt).toUTCString() }}</div>
                    <div v-if="item.receivedBy">by {{ item.receivedBy }}</div>
                  </div>
                </v-timeline-item>
                <v-timeline-item v-if="item.orderedAt" color="green">
                  <div class="py-4">
                    <div class="font-weight-light mb-4">Ordered at {{ new Date(item.orderedAt).toUTCString() }}</div>
                    <div v-if="item.orderedBy">by {{ item.orderedBy }}</div>
                  </div>
                </v-timeline-item>
                <v-timeline-item v-if="item.approvedAt" color="purple">
                  <div class="py-4">
                    <div class="font-weight-light mb-4">Approved at {{ new Date(item.approvedAt).toUTCString() }}</div>
                    <div v-if="item.approvedBy">by {{ item.approvedBy }}</div>
                  </div>
                </v-timeline-item>
                <v-timeline-item v-if="item.requestedAt" color="blue">
                  <div class="py-4">
                    <div class="font-weight-light mb-4">
                      Requested at {{ new Date(item.requestedAt).toUTCString() }}
                    </div>
                    <div v-if="item.requestedBy">by {{ item.requestedBy }}</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card>
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

@Component({
  components: {
    LotDetailsView,
    LoadingView,
  },
})
export default class LotsView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly lotContext = lotModule.context(this.$store);
  readonly providerContext = providerModule.context(this.$store);

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
      text: "Number",
      value: "number",
    },
    {
      text: "Reference",
      value: "reference",
    },
    {
      text: "Name",
      value: "name",
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
    },
    {
      text: "Purpose",
      value: "purpose",
    },
    {
      text: "Low",
      value: "isLow",
      filterable: false,
    },
    {
      text: "price",
      value: "price",
      filterable: false,
    },
    {
      text: "note",
      value: "note",
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
  detailsItem: LotDto | null = null;
  search = "";

  statusFilter: string[] = [];
  providerFilter: number[] = [];

  get statuses() {
    return [...new Set(this.lotContext.getters.lots.map(item => item.status))];
  }

  get providers() {
    return this.providerContext.getters.providers;
  }

  get items() {
    let items = this.lotContext.getters.lots;
    if (this.statusFilter.length > 0) {
      items = items.filter(item => this.statusFilter.includes(item.status));
    }
    if (this.providerFilter.length > 0) {
      items = items.filter(item =>
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
      (item.number ? item.number.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      item.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 ||
      (item.reference ? item.reference.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.provider ? item.provider.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.clone ? item.clone.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      item.status.toLowerCase().indexOf(normalizedSearchTerm) !== -1 ||
      (item.purpose ? item.purpose.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false)
    );
  }

  showDetails(item: LotDto) {
    this.detailsItem = item;
    this.drawer = !this.drawer;
  }

  async mounted() {
    await Promise.all([
      this.lotContext.actions.getGroupLots(+this.$router.currentRoute.params.groupId),
      this.providerContext.actions.getGroupProviders(+this.$router.currentRoute.params.groupId),
    ]);
  }

  async deleteLot(id: number) {
    if (self.confirm("Are you sure you want to delete the lot?")) {
      await this.lotContext.actions.deleteLot(id);
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
