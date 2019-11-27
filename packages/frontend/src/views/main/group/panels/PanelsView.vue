<template>
  <LoadingView v-if="!items" text="Loading panels..." />
  <v-col v-else>
    <v-toolbar class="toolbar">
      <v-toolbar-title>
        Panels
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text :to="`/main/group/${activeGroupId}/panels/create`">Create Panel</v-btn>
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
          itemsPerPageOptions: [10, 15, 20, 100],
          showFirstLastPage: true,
          showCurrentPage: true,
        }"
        multi-sort
        show-expand
      >
        <template v-slot:item.application="{ item }">
          {{ item.application | applicationToString }}
        </template>
        <template v-slot:item.isFluor="{ item }">
          <v-icon v-if="item.isFluor">mdi-check</v-icon>
        </template>
        <template v-slot:item.isProduction="{ item }">
          <v-icon v-if="item.isProduction">mdi-check</v-icon>
        </template>
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                :to="{
                  name: 'main-group-panels-edit',
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
              <v-btn v-on="on" icon @click="deletePanel(item.id)">
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
                {{ item.name }}
              </v-card-title>
              <v-card-text>
                {{ item.description }}
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
import { panelModule } from "@/modules/panel";
import { PanelDto } from "@airlab/shared/lib/panel/dto";
import { applicationToString } from "@/utils/converters";

@Component({
  components: {
    LoadingView,
  },
})
export default class PanelsView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly panelContext = panelModule.context(this.$store);

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
      text: "Description",
      value: "description",
    },
    {
      text: "Fluor",
      value: "isFluor",
      filterable: false,
    },
    {
      text: "Production",
      value: "isProduction",
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
      text: "Actions",
      value: "action",
      sortable: false,
      filterable: false,
      width: "210",
    },
  ];

  drawer = false;
  detailsItem: PanelDto | null = null;
  search = "";

  get items() {
    return this.panelContext.getters.panels;
  }

  showDetails(item: PanelDto) {
    this.detailsItem = item;
    this.drawer = !this.drawer;
  }

  async mounted() {
    if (this.activeGroupId) {
      await this.panelContext.actions.getAllPanelsForGroup(this.activeGroupId);
    }
  }

  async deletePanel(id: number) {
    if (self.confirm("Are you sure you want to delete the panel?")) {
      await this.panelContext.actions.deletePanel(id);
    }
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
