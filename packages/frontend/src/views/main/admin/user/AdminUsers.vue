<template>
  <v-col>
    <v-toolbar class="toolbar">
      <v-toolbar-title>
        Users
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn v-if="isAdmin" text to="/main/admin/users/create">Create User</v-btn>
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
        <template v-slot:item.isActive="{ item }">
          <v-icon v-if="item.isActive">mdi-check</v-icon>
        </template>
        <template v-slot:item.isAdmin="{ item }">
          <v-icon v-if="item.isAdmin">mdi-check</v-icon>
        </template>
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon :to="{ name: 'main-admin-users-edit', params: { id: item.id } }">
                <v-icon color="grey">mdi-pencil-outline</v-icon>
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
import { mainModule } from "@/modules/main";

@Component
export default class AdminUsers extends Vue {
  readonly userContext = userModule.context(this.$store);
  readonly mainContext = mainModule.context(this.$store);

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
      text: "Active",
      sortable: true,
      value: "isActive",
      align: "left",
      filterable: false,
      width: "110",
    },
    {
      text: "Admin",
      sortable: true,
      value: "isAdmin",
      align: "left",
      filterable: false,
      width: "110",
    },
    {
      text: "Actions",
      value: "action",
      sortable: false,
      filterable: false,
      width: "70",
    },
  ];

  search = "";

  get isAdmin() {
    return this.mainContext.getters.isAdmin;
  }

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
