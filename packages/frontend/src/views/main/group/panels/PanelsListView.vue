<template>
  <LoadingView v-if="!items" text="Loading panels..." />
  <v-col v-else>
    <v-toolbar dense class="toolbar">
      <v-toolbar-title>Panels</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text :to="`/main/groups/${activeGroupId}/panels/create`" color="primary">Create Panel</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Filter</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-select
            v-model="applicationFilter"
            :items="applications"
            item-text="text"
            item-value="value"
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
                {{ item.text }}
              </v-chip>
            </template>
          </v-select>
          <v-switch label="Show only own panels" v-model="showOwnPanels" />
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
        <template v-slot:item.name="{ item }">
          <router-link
            class="link"
            :to="{
              name: 'main-group-panels-view',
              params: {
                id: item.id,
              },
            }"
          >
            {{ item.name }}
          </router-link>
        </template>
        <template v-slot:item.application="{ item }">
          {{ item.application | applicationToString }}
        </template>
        <template v-slot:item.updatedAt="{ item }">
          {{ item.updatedAt | stringToUTCString }}
        </template>
        <template v-slot:item.isFluorophore="{ item }">
          <v-icon v-if="item.isFluorophore">mdi-check</v-icon>
        </template>
        <template v-slot:item.isLocked="{ item }">
          <v-icon v-if="item.isLocked">mdi-lock-outline</v-icon>
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
          <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item
                :to="{
                  name: 'main-group-panels-edit',
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
              <v-list-item
                :to="{
                  name: 'main-group-panels-view',
                  params: {
                    groupId: activeGroupId,
                    id: item.id,
                  },
                }"
              >
                <v-list-item-icon>
                  <v-icon color="grey">mdi-eyedropper</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Refine</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="duplicatePanel(item.id)">
                <v-list-item-icon>
                  <v-icon color="grey">mdi-content-duplicate</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Duplicate</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="isGroupAdmin" @click="updatePanelArchiveState(item.id, !item.isArchived)">
                <v-list-item-icon>
                  <v-icon color="red accent-1">{{
                    item.isArchived ? "mdi-archive-arrow-up-outline" : "mdi-archive-arrow-down-outline"
                  }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.isArchived ? "Unarchive" : "Archive" }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="isGroupAdmin" @click="deletePanel(item.id)">
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
            <PanelExpandedView :panel="item" />
          </td>
        </template>
      </v-data-table>
    </v-card>
    <v-navigation-drawer v-model="drawer" right fixed temporary width="400">
      <PanelDetailsView v-if="drawer" :panel="detailsItem" />
    </v-navigation-drawer>
  </v-col>
</template>

<script lang="ts">
import LoadingView from "@/components/LoadingView.vue";
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { panelModule } from "@/modules/panel";
import { DuplicatePanelDto, PanelDto } from "@airlab/shared/lib/panel/dto";
import { applicationToString } from "@/utils/converters";
import PanelDetailsView from "@/views/main/group/panels/PanelDetailsView.vue";
import { applicationEnum } from "@/utils/enums";
import PanelExpandedView from "@/views/main/group/panels/PanelExpandedView.vue";

@Component({
  components: {
    PanelExpandedView,
    PanelDetailsView,
    LoadingView,
  },
})
export default class PanelsListView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly panelContext = panelModule.context(this.$store);

  readonly applications = applicationEnum;

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get isGroupAdmin() {
    return this.groupContext.getters.isGroupAdmin;
  }

  get member() {
    return this.groupContext.getters.myMember;
  }

  readonly headers = [
    // {
    //   text: "Id",
    //   value: "id",
    //   align: "end",
    //   filterable: false,
    //   width: "80",
    // },
    {
      text: "Name",
      value: "name",
    },
    {
      text: "Description",
      value: "description",
    },
    {
      text: "Fluorophore",
      value: "isFluorophore",
      filterable: false,
    },
    {
      text: "Locked",
      value: "isLocked",
      filterable: false,
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
      text: "Created by",
      value: "user",
      sort: (a, b) => a.name.localeCompare(b.name),
    },
    {
      text: "Updated at",
      value: "updatedAt",
      sort: (a, b) => a.name.localeCompare(b.name),
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
  detailsItem: PanelDto | null = null;
  search = "";

  applicationFilter: number[] = [];
  showOwnPanels = true;

  get items() {
    let items = this.panelContext.getters.panels;
    if (this.showOwnPanels && this.member !== null) {
      items = items.filter((item) => item.createdBy === this.member!.id);
    }
    if (this.applicationFilter.length > 0) {
      items = items.filter((item) => this.applicationFilter.includes(item.application));
    }
    return items;
  }

  filter(value: any, search: string | null, item: any) {
    if (!search) {
      return true;
    }
    const normalizedSearchTerm = search.toLowerCase().trim();
    return (
      (item.name ? item.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.description ? item.description.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.user && item.user.name ? item.user.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false)
    );
  }

  showDetails(item: PanelDto) {
    this.detailsItem = item;
    this.drawer = !this.drawer;
  }

  async mounted() {
    document.onkeydown = (evt) => {
      if (this.drawer && evt.key === "Escape") {
        this.drawer = false;
      }
    };
    await this.panelContext.actions.getGroupPanels(+this.$router.currentRoute.params.groupId);
  }

  async duplicatePanel(id: number) {
    const name = self.prompt("New Panel Name", "My Panel");
    if (name && this.activeGroupId) {
      const data: DuplicatePanelDto = {
        groupId: this.activeGroupId,
        name: name,
      };
      await this.panelContext.actions.duplicatePanel({ id: id, data: data });
    }
  }

  async deletePanel(id: number) {
    if (self.confirm("Are you sure you want to delete the panel?")) {
      await this.panelContext.actions.deletePanel(id);
    }
  }

  async updatePanelArchiveState(id: number, state: boolean) {
    if (self.confirm(`Are you sure you want to ${state ? "archive" : "unarchive"} the panel?`)) {
      await this.panelContext.actions.updatePanelArchiveState({ id: id, data: { state: state } });
    }
  }

  removeApplicationFilter(item) {
    this.applicationFilter.splice(this.applicationFilter.indexOf(item), 1);
    this.applicationFilter = [...this.applicationFilter];
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
