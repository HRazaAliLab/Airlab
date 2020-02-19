<template>
  <v-col>
    <v-toolbar dense class="toolbar">
      <v-toolbar-title>
        Providers
      </v-toolbar-title>
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
      >
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                :to="{
                  name: 'main-group-providers-edit',
                  params: { id: item.id },
                }"
              >
                <v-icon color="grey">mdi-pencil-outline</v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon @click="deleteProvider(item.id)">
                <v-icon color="red accent-1">mdi-delete-outline</v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
          <v-btn text color="primary" @click.stop="showDetails(item)">
            Details
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-navigation-drawer v-model="drawer" right fixed temporary width="400">
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

@Component({
  components: { ProviderDetailsView },
})
export default class ProvidersView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly providerContext = providerModule.context(this.$store);

  readonly headers = [
    {
      text: "Id",
      sortable: true,
      value: "id",
      align: "right",
      filterable: false,
      width: "80",
    },
    {
      text: "Name",
      sortable: true,
      value: "name",
      align: "left",
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
  detailsItem: ProviderDto | null = null;
  search = "";

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get items() {
    return this.providerContext.getters.providers;
  }

  showDetails(item: ProviderDto) {
    this.detailsItem = item;
    this.drawer = !this.drawer;
  }

  async mounted() {
    await this.providerContext.actions.getGroupProviders(+this.$router.currentRoute.params.groupId);
  }

  async deleteProvider(id: number) {
    if (self.confirm("Are you sure you want to delete the provider?")) {
      await this.providerContext.actions.deleteProvider(id);
    }
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
