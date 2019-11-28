<template>
  <v-col>
    <v-toolbar class="toolbar">
      <v-toolbar-title>
        Manage Groups
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text to="/main/admin/group/create">Create Group</v-btn>
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
        <template v-slot:item.isOpen="{ item }">
          <v-icon v-if="item.isOpen">mdi-check</v-icon>
        </template>
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                :to="{
                  name: 'main-admin-group-edit',
                  params: { id: item.id },
                }"
              >
                <v-icon color="grey">mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon @click="deleteGroup(item.id)">
                <v-icon color="red accent-1">mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";

@Component
export default class AdminGroups extends Vue {
  readonly groupContext = groupModule.context(this.$store);

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
      text: "Institution",
      sortable: true,
      value: "institution",
      align: "left",
    },
    {
      text: "Open",
      sortable: true,
      value: "isOpen",
      align: "left",
      filterable: false,
      width: "100",
    },
    {
      text: "Actions",
      value: "action",
      sortable: false,
      filterable: false,
      width: "110",
    },
  ];

  search = "";

  get items() {
    return this.groupContext.getters.groups;
  }

  async mounted() {
    await this.groupContext.actions.getGroups();
  }

  async deleteGroup(id: number) {
    if (self.confirm("Are you sure you want to delete the group?")) {
      await this.groupContext.actions.deleteGroup(id);
    }
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
