<template>
  <div>
    <v-toolbar dense light>
      <v-toolbar-title>
        Manage Groups
      </v-toolbar-title>
      <v-spacer />
      <v-btn small color="primary" to="/main/admin/group/create">Create Group</v-btn>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="groups"
      :items-per-page="15"
      :footer-props="{
        itemsPerPageOptions: [10, 15, 20, -1],
      }"
    >
      <template v-slot:item.acceptRequests="{ item }">
        <v-icon v-if="item.acceptRequests">mdi-check</v-icon>
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
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="deleteGroup($event, item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Delete</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";

@Component
export default class AdminGroups extends Vue {
  readonly groupContext = groupModule.context(this.$store);

  headers = [
    {
      text: "Id",
      sortable: true,
      value: "id",
      align: "right",
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
      text: "Accept Requests",
      sortable: true,
      value: "acceptRequests",
      align: "left",
    },
    {
      text: "Actions",
      value: "action",
      sortable: false,
    },
  ];

  get groups() {
    return this.groupContext.getters.groups;
  }

  async mounted() {
    await this.groupContext.actions.getGroups();
  }

  async deleteGroup(event, id: number) {
    if (self.confirm("Are you sure you want to delete the group?")) {
      await this.groupContext.actions.deleteGroup(id);
    }
  }
}
</script>
