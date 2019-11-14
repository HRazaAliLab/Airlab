<template>
  <LoadingView v-if="!items" text="Loading conjugates..." />
  <v-col v-else>
    <v-toolbar class="toolbar">
      <v-toolbar-title>
        Conjugates
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text :to="`/main/group/${activeGroupId}/conjugates/create`">Create Conjugate</v-btn>
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
                  name: 'main-group-conjugates-edit',
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
              <v-btn v-on="on" icon @click="deleteConjugate(item.id)">
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
                {{ item.bindingRegion }}
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
import { conjugateModule } from "@/modules/conjugate";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";

@Component({
  components: {
    LoadingView,
  },
})
export default class ConjugatesViews extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly conjugateContext = conjugateModule.context(this.$store);

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
      text: "Tube Number",
      sortable: true,
      value: "tubeNumber",
      align: "end",
    },
    {
      text: "Lot",
      sortable: true,
      value: "lot.number",
    },
    {
      text: "Tag",
      sortable: true,
      value: "label",
    },
    {
      text: "Labeled by",
      sortable: true,
      value: "user.name",
    },
    {
      text: "Concentration",
      sortable: true,
      value: "concentration",
      align: "end",
    },
    {
      text: "Description",
      sortable: true,
      value: "description",
    },
    {
      text: "Is Low",
      sortable: true,
      value: "isLow",
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

  get items() {
    return this.conjugateContext.getters.conjugates.map(item => ({
      ...item,
      label: (item as any).tag
        ? (item as any).tag.mw
          ? (item as any).tag.name + (item as any).tag.mw
          : (item as any).tag.name
        : "unknown",
    }));
  }

  showDetails(item: ConjugateDto) {
    this.detailsItem = item;
    this.drawer = !this.drawer;
  }

  async mounted() {
    await this.conjugateContext.actions.getConjugates();
  }

  async deleteConjugate(id: number) {
    if (self.confirm("Are you sure you want to delete the conjugate?")) {
      await this.conjugateContext.actions.deleteConjugate(id);
    }
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
