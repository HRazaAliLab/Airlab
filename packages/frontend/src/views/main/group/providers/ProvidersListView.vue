<template>
  <v-col>
    <v-toolbar dense class="toolbar">
      <v-toolbar-title>Providers</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text :to="`/main/groups/${activeGroupId}/providers/create`" color="primary">Create Provider</v-btn>
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
          <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item
                :to="{
                  name: 'main-group-providers-edit',
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
<!--              <v-list-item v-if="isGroupAdmin" @click="deleteProvider(item.id)">-->
<!--                <v-list-item-icon>-->
<!--                  <v-icon color="red accent-1">mdi-delete-outline</v-icon>-->
<!--                </v-list-item-icon>-->
<!--                <v-list-item-content>-->
<!--                  <v-list-item-title>Delete</v-list-item-title>-->
<!--                </v-list-item-content>-->
<!--              </v-list-item>-->
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
            <ProviderExpandedView :provider="item" />
          </td>
        </template>
      </v-data-table>
    </v-card>
    <v-navigation-drawer v-model="drawer" right fixed temporary width="500">
      <ProviderDetailsView v-if="drawer" :provider="detailsItem" />
    </v-navigation-drawer>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { providerModule } from "@/modules/provider";
import { groupModule } from "@/modules/group";
import ProviderDetailsView from "@/views/main/group/providers/ProviderDetailsView.vue";
import { ProviderDto } from "@airlab/shared/lib/provider/dto";
import ProviderExpandedView from "@/views/main/group/providers/ProviderExpandedView.vue";

@Component({
  components: { ProviderExpandedView, ProviderDetailsView },
})
export default class ProvidersListView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly providerContext = providerModule.context(this.$store);

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
      text: "URL",
      value: "url",
      filterable: false,
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
  detailsItem: ProviderDto | null = null;
  search = "";

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get isGroupAdmin() {
    return this.groupContext.getters.isGroupAdmin;
  }

  get items() {
    return this.providerContext.getters.providers;
  }

  showDetails(item: ProviderDto) {
    this.detailsItem = item;
    this.drawer = !this.drawer;
  }

  async mounted() {
    document.onkeydown = (evt) => {
      if (this.drawer && evt.key === "Escape") {
        this.drawer = false;
      }
    };
    await this.providerContext.actions.getGroupProviders(+this.$router.currentRoute.params.groupId);
  }

  async deleteProvider(id: number) {
    if (self.confirm("Are you sure you want to delete the provider?")) {
      if (self.confirm("All children entities will be deleted!")) {
        await this.providerContext.actions.deleteProvider(id);
      }
    }
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
