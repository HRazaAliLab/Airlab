<template>
  <LoadingView v-if="!items" text="Loading clones..." />
  <v-col v-else>
    <v-toolbar class="toolbar">
      <v-toolbar-title>
        Clones
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text :to="`/main/group/${activeGroupId}/clones/create`">Create Clone</v-btn>
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
        <template v-slot:item.isPhospho="{ item }">
          <v-icon v-if="item.isPhospho">mdi-check</v-icon>
        </template>
        <template v-slot:item.isPolyclonal="{ item }">
          <v-icon v-if="item.isPolyclonal">mdi-check</v-icon>
        </template>
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                :to="{
                  name: 'main-group-clones-edit',
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
              <v-btn v-on="on" icon @click="deleteClone($event, item.id)">
                <v-icon color="red accent-1">mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-card flat tile class="my-2">
              <v-card-title>
                {{ item.name }}
              </v-card-title>
              <v-card-text>
                {{ item.bindingRegion }}
              </v-card-text>
              <v-card-actions>
                <v-btn text color="primary" target="_blank" :href="citeAb(item)">CiteAb</v-btn>
                <v-btn text color="primary" target="_blank" :href="antibodyRegistry(item)">AntibodyRegistry</v-btn>
                <v-btn text color="primary" target="_blank" :href="antibodyPedia(item)">AntibodyPedia</v-btn>
              </v-card-actions>
            </v-card>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import LoadingView from "@/components/LoadingView.vue";
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { cloneModule } from "@/modules/clone";
import { CloneDto } from "@airlab/shared/lib/clone/dto";

@Component({
  components: {
    LoadingView,
  },
})
export default class ClonesView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly cloneContext = cloneModule.context(this.$store);

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  readonly headers = [
    {
      text: "Id",
      sortable: true,
      value: "id",
      align: "right",
      filterable: false,
    },
    {
      text: "Name",
      sortable: true,
      value: "name",
      align: "left",
    },
    {
      text: "Protein",
      sortable: true,
      value: "protein.name",
      align: "left",
    },
    {
      text: "Host Species",
      sortable: true,
      value: "hostSpecies.name",
      align: "left",
    },
    {
      text: "Epitope",
      sortable: true,
      value: "bindingRegion",
      align: "left",
    },
    {
      text: "Isotype",
      sortable: true,
      value: "isotype",
      align: "left",
    },
    {
      text: "Phosphoantibody",
      sortable: true,
      value: "isPhospho",
      align: "left",
      filterable: false,
    },
    {
      text: "Polyclonal",
      sortable: true,
      value: "isPolyclonal",
      align: "left",
      filterable: false,
    },
    {
      text: "Actions",
      value: "action",
      sortable: false,
      filterable: false,
    },
  ];

  search = "";

  get items() {
    return this.cloneContext.getters.clones;
  }

  citeAb(clone: CloneDto) {
    return `http://www.citeab.com/search?q=${clone.name}`;
  }

  antibodyRegistry(clone: CloneDto) {
    return `http://www.antibodyregistry.org/search?q=${(clone as any).protein.name}%20${clone.name}`;
  }

  antibodyPedia(clone: CloneDto) {
    return `http://www.antibodypedia.com/explore/${(clone as any).protein.name}+${clone.name}`;
  }

  async mounted() {
    await this.cloneContext.actions.getAllClonesForUser();
  }

  async deleteClone(event, id: number) {
    if (self.confirm("Are you sure you want to delete the clone?")) {
      await this.cloneContext.actions.deleteClone(id);
    }
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
