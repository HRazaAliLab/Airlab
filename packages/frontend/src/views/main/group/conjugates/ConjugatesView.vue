<template>
  <LoadingView v-if="!items" text="Loading conjugates..." />
  <v-col v-else>
    <v-toolbar dense class="toolbar">
      <v-toolbar-title>
        Conjugates
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text :to="`/main/groups/${activeGroupId}/conjugates/create`" color="primary">Create Conjugate</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Filter</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-select
            v-model="tagFilter"
            :items="tags"
            item-text="name"
            item-value="id"
            chips
            clearable
            label="Tags"
            multiple
            prepend-icon="mdi-filter-outline"
            solo
            dense
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip v-bind="attrs" :input-value="selected" close @click="select" @click:close="removeTagFilter(item)">
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
        <template v-slot:item.lot.clone.protein="{ item }">
          <router-link
            v-if="item.lot && item.lot.clone && item.lot.clone.protein"
            class="link"
            :to="{
              name: 'main-group-proteins-edit',
              params: {
                groupId: activeGroupId,
                id: item.lot.clone.protein.id,
              },
            }"
          >
            {{ item.lot.clone.protein.name }}
          </router-link>
        </template>
        <template v-slot:item.lot.clone="{ item }">
          <router-link
            v-if="item.lot && item.lot.clone"
            class="link"
            :to="{
              name: 'main-group-clones-edit',
              params: {
                groupId: activeGroupId,
                id: item.lot.clone.id,
              },
            }"
          >
            {{ item.lot.clone.name }}
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
        <template v-slot:item.label="{ item }">
          <router-link
            v-if="item.tag"
            class="link"
            :to="{
              name: 'main-group-tags-edit',
              params: {
                groupId: activeGroupId,
                id: item.tag.id,
              },
            }"
          >
            {{ item.label }}
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
        <template v-slot:item.status="{ item }">
          <v-chip :color="getConjugateStatusColor(item)" class="mr-1" small dark label>
            {{ item.status | conjugateStatusToString }}
          </v-chip>
        </template>
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                :to="{
                  name: 'main-group-conjugates-edit',
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
              <v-btn v-on="on" icon @click="deleteConjugate(item.id)">
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
                {{ item.tubeNumber }}
              </v-card-title>
              <v-card-text>
                {{ item.description }}
              </v-card-text>
            </v-card>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <v-navigation-drawer v-model="drawer" right fixed temporary width="400">
      <ConjugateDetailsView v-if="drawer" :conjugate="detailsItem" />
    </v-navigation-drawer>
  </v-col>
</template>

<script lang="ts">
import LoadingView from "@/components/LoadingView.vue";
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { conjugateModule } from "@/modules/conjugate";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { tagModule } from "@/modules/tag";
import ConjugateDetailsView from "@/views/main/group/conjugates/ConjugateDetailsView.vue";
import { getConjugateStatusColor } from "@/utils/converters";

@Component({
  components: {
    ConjugateDetailsView,
    LoadingView,
  },
})
export default class ConjugatesViews extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly tagContext = tagModule.context(this.$store);
  readonly conjugateContext = conjugateModule.context(this.$store);

  readonly getConjugateStatusColor = getConjugateStatusColor;

  readonly statuses = [
    { id: 0, name: "Normal" },
    { id: 1, name: "Low" },
    { id: 2, name: "Finished" },
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
      text: "Tube Number",
      value: "tubeNumber",
      align: "end",
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
      text: "Tag",
      value: "label",
    },
    {
      text: "Labeled by",
      value: "user",
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
      text: "Concentration",
      value: "concentration",
      align: "end",
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
  detailsItem: ConjugateDto | null = null;
  search = "";

  tagFilter: number[] = [];
  statusFilter: number[] = [];

  get tags() {
    return this.tagContext.getters.tags.map(item => ({
      id: item.id,
      name: item.mw ? item.name + item.mw : item.name,
    }));
  }

  get items() {
    let items = this.conjugateContext.getters.conjugates.map(item => ({
      ...item,
      label: (item as any).tag
        ? (item as any).tag.mw
          ? (item as any).tag.name + (item as any).tag.mw
          : (item as any).tag.name
        : "unknown",
    }));
    if (this.tagFilter.length > 0) {
      items = items.filter(item => ((item as any).tag ? this.tagFilter.includes((item as any).tag.id) : false));
    }
    if (this.statusFilter.length > 0) {
      items = items.filter(item => this.statusFilter.includes(item.status));
    }
    return items;
  }

  filter(value, search, item) {
    if (!search) {
      return true;
    }
    const normalizedSearchTerm = search.toLowerCase().trim();
    return (
      item.tubeNumber.toString().indexOf(normalizedSearchTerm) !== -1 ||
      (item.lot ? item.lot.clone.protein.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.lot ? item.lot.clone.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.lot ? item.lot.number.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.tag ? item.tag.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.user ? item.user.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      item.concentration.toLowerCase().indexOf(normalizedSearchTerm) !== -1 ||
      (item.description ? item.description.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false)
    );
  }

  showDetails(item: ConjugateDto) {
    this.detailsItem = item;
    this.drawer = !this.drawer;
  }

  async mounted() {
    await Promise.all([
      this.conjugateContext.actions.getGroupConjugates(+this.$router.currentRoute.params.groupId),
      this.tagContext.actions.getGroupTags(+this.$router.currentRoute.params.groupId),
    ]);
  }

  async deleteConjugate(id: number) {
    if (self.confirm("Are you sure you want to delete the conjugate?")) {
      await this.conjugateContext.actions.deleteConjugate(id);
    }
  }

  removeTagFilter(item) {
    this.tagFilter.splice(this.tagFilter.indexOf(item), 1);
    this.tagFilter = [...this.tagFilter];
  }

  removeStatusFilter(item) {
    this.statusFilter.splice(this.statusFilter.indexOf(item), 1);
    this.statusFilter = [...this.statusFilter];
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
