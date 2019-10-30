<template>
  <div>
    <v-toolbar dense>
      <v-toolbar-title>
        Manage Users
      </v-toolbar-title>
      <v-spacer />
      <v-btn small color="primary" to="/main/admin/user/create">Create User</v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="15"
      :footer-props="{
        itemsPerPageOptions: [10, 15, 20, -1],
      }"
    >
      <template v-slot:item.active="{ item }">
        <v-icon v-if="item.active">mdi-check</v-icon>
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon :to="{ name: 'main-admin-user-edit', params: { id: item.id } }">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { userModule } from "@/modules/user";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AdminUsers extends Vue {
  readonly userContext = userModule.context(this.$store);

  headers = [
    {
      text: "Id",
      sortable: true,
      value: "id",
      align: "right",
    },
    {
      text: "Email",
      sortable: true,
      value: "email",
      align: "left",
    },
    {
      text: "Name",
      sortable: true,
      value: "name",
      align: "left",
    },
    {
      text: "Last Name",
      sortable: true,
      value: "lastName",
      align: "left",
    },
    {
      text: "Active",
      sortable: true,
      value: "active",
      align: "left",
    },
    {
      text: "Actions",
      value: "action",
      sortable: false,
    },
  ];

  get users() {
    return this.userContext.getters.users;
  }

  async mounted() {
    await this.userContext.actions.getUsers();
  }
}
</script>
