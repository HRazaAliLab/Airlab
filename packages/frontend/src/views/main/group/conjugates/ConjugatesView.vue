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
        <template v-slot:item.label="{ item }">
          {{ item.tag.mw + item.tag.name }}
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
              <v-btn v-on="on" icon @click="deleteConjugate($event, item.id)">
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
import { conjugateModule } from "@/modules/conjugate";

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
      align: "right",
      filterable: false,
    },
    {
      text: "Tube Number",
      sortable: true,
      value: "bbTubeNumber",
      align: "right",
    },
    {
      text: "Label",
      sortable: true,
      value: "label",
      align: "left",
    },
    {
      text: "Labeled by",
      sortable: true,
      value: "user.name",
      align: "left",
    },
    {
      text: "Concentration",
      sortable: true,
      value: "concentration",
      align: "right",
    },
    {
      text: "Reactivity",
      sortable: true,
      value: "isotype",
      align: "left",
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
    return this.conjugateContext.getters.conjugates;
  }

  async mounted() {
    await this.conjugateContext.actions.getConjugates();
  }

  async deleteConjugate(event, id: number) {
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
