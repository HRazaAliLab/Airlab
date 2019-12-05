<template>
  <LoadingView v-if="!items" text="Loading panels..." />
  <v-col v-else>
    <v-toolbar class="toolbar">
      <v-toolbar-title>
        Panels
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text :to="`/main/groups/${activeGroupId}/panels/create`">Create Panel</v-btn>
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
                  name: 'main-group-panels-edit',
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
              <v-btn v-on="on" icon @click="duplicatePanel(item.id)">
                <v-icon color="grey">mdi-content-duplicate</v-icon>
              </v-btn>
            </template>
            <span>Duplicate</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                :to="{
                  name: 'main-group-panels-view',
                  params: {
                    groupId: activeGroupId,
                    id: item.id,
                  },
                }"
              >
                <v-icon color="grey">mdi-eyedropper</v-icon>
              </v-btn>
            </template>
            <span>Refine</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon @click="deletePanel(item.id)">
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
import { DuplicatePanelDto, PanelDto } from "@airlab/shared/lib/panel/dto";
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
      text: "Created by",
      value: "user",
      sort: (a, b) => a.name.localeCompare(b.name),
    },
    {
      text: "Actions",
      value: "action",
      sortable: false,
      filterable: false,
      width: "275",
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
