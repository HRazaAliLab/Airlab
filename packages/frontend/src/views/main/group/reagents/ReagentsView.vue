<template>
  <LoadingView v-if="!items" text="Loading reagents..." />
  <v-col v-else>
    <v-toolbar class="toolbar">
      <v-toolbar-title>
        Reagents
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text :to="`/main/groups/${activeGroupId}/reagents/create`">Create Reagent</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Filter</v-expansion-panel-header>
        <v-expansion-panel-content>
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
              name: 'main-admin-providers-edit',
              params: {
                groupId: activeGroupId,
                id: item.provider.id,
              },
            }"
          >
            {{ item.provider.name }}
          </router-link>
        </template>
        <template v-slot:item.user="{ item }">
          <router-link
            v-if="item.user"
            class="link"
            :to="{
              name: 'main-admin-users-edit',
              params: {
                groupId: activeGroupId,
                id: item.user.id,
              },
            }"
          >
            {{ item.user.name }}
          </router-link>
        </template>
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                :to="{
                  name: 'main-group-reagents-edit',
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
              <v-btn v-on="on" icon @click="deleteReagent(item.id)">
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
              <v-card-title>
                {{ item.name }}
              </v-card-title>
              <v-card-text>
                {{ item.reference }}
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
          <InfoView :item="detailsItem" />
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
  </v-col>
</template>

<script lang="ts">
import LoadingView from "@/components/LoadingView.vue";
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { reagentModule } from "@/modules/reagent";
import { ReagentDto } from "@airlab/shared/lib/reagent/dto";
import InfoView from "@/components/InfoView.vue";
import { providerModule } from "@/modules/provider";

@Component({
  components: {
    InfoView,
    LoadingView,
  },
})
export default class ReagentsView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly reagentContext = reagentModule.context(this.$store);
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
      text: "Name",
      value: "name",
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
      text: "Created by",
      value: "user",
      sort: (a, b) => a.name.localeCompare(b.name),
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
  detailsItem: ReagentDto | null = null;
  search = "";

  providerFilter: number[] = [];

  get providers() {
    return this.providerContext.getters.providers;
  }

  get items() {
    let items = this.reagentContext.getters.reagents;
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
      item.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 ||
      (item.reference ? item.reference.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.provider ? item.provider.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.user ? item.user.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false)
    );
  }

  showDetails(item: ReagentDto) {
    this.detailsItem = item;
    this.drawer = !this.drawer;
  }

  async mounted() {
    await Promise.all([
      this.reagentContext.actions.getGroupReagents(+this.$router.currentRoute.params.groupId),
      this.providerContext.actions.getGroupProviders(+this.$router.currentRoute.params.groupId),
    ]);
  }

  async deleteReagent(id: number) {
    if (self.confirm("Are you sure you want to delete the reagent?")) {
      await this.reagentContext.actions.deleteReagent(id);
    }
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
</style>
