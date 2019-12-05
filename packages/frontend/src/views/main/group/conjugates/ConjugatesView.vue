<template>
  <LoadingView v-if="!items" text="Loading conjugates..." />
  <v-col v-else>
    <v-toolbar class="toolbar">
      <v-toolbar-title>
        Conjugates
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text :to="`/main/groups/${activeGroupId}/conjugates/create`">Create Conjugate</v-btn>
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
      text: "Is Low",
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

  filter(value, search, item) {
    if (!search) {
      return true;
    }
    const normalizedSearchTerm = search.toLowerCase().trim();
    return (
      item.tubeNumber.toString().indexOf(normalizedSearchTerm) !== -1 ||
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
    await this.conjugateContext.actions.getGroupConjugates(+this.$router.currentRoute.params.groupId);
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
.link {
  text-decoration: none;
}
</style>
