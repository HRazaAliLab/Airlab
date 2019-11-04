<template>
  <v-col>
    <v-toolbar class="toolbar">
      <v-toolbar-title>
        Manage Users
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text to="/main/admin/user/create">Create User</v-btn>
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
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { userModule } from "@/modules/user";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AdminUsers extends Vue {
  readonly userContext = userModule.context(this.$store);

  readonly headers = [
    {
      text: "Id",
      sortable: true,
      value: "id",
      align: "right",
      filterable: false,
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
    return this.userContext.getters.users;
  }

  async mounted() {
    await this.userContext.actions.getUsers();
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
