<template>
  <LoadingView v-if="!items" text="Loading reagents..." />
  <v-col v-else>
    <v-toolbar class="toolbar">
      <v-toolbar-title>
        Reagents
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text :to="`/main/group/${activeGroupId}/reagents/create`">Create Reagent</v-btn>
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
          itemsPerPageOptions: [10, 15, 20, -1],
          showFirstLastPage: true,
          showCurrentPage: true,
        }"
        multi-sort
        show-expand
      >
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
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon @click="deleteReagent(item.id)">
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

@Component({
  components: {
    InfoView,
    LoadingView,
  },
})
export default class ReagentsView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly reagentContext = reagentModule.context(this.$store);

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  readonly headers = [
    {
      text: "Id",
      sortable: true,
      value: "id",
      align: "end",
      filterable: false,
      width: "80",
    },
    {
      text: "Name",
      sortable: true,
      value: "name",
    },
    {
      text: "Reference",
      sortable: true,
      value: "reference",
    },
    {
      text: "Provider",
      sortable: true,
      value: "provider.name",
    },
    {
      text: "Created by",
      sortable: true,
      value: "user.name",
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

  get items() {
    return this.reagentContext.getters.reagents;
  }

  showDetails(item: ReagentDto) {
    this.detailsItem = item;
    this.drawer = !this.drawer;
  }

  async mounted() {
    if (this.activeGroupId) {
      await this.reagentContext.actions.getAllReagentsForGroup(this.activeGroupId);
    }
  }

  async deleteReagent(id: number) {
    if (self.confirm("Are you sure you want to delete the reagent?")) {
      await this.reagentContext.actions.deleteReagent(id);
    }
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
