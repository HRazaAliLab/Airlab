<template>
  <v-col>
    <v-toolbar dense class="toolbar">
      <v-toolbar-title>
        Group Members
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn v-if="groupRole < 2" text :to="`/main/groups/${activeGroupId}/members/create`" color="primary">
          Create Member
        </v-btn>
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
        <template v-slot:item.role="{ item }">
          {{ roleToString(item.role) }}
        </template>
        <template v-slot:item.isActive="{ item }">
          <v-icon v-if="item.isActive">mdi-check</v-icon>
        </template>
        <template v-slot:item.canOrder="{ item }">
          <v-icon v-if="item.canOrder">mdi-check</v-icon>
        </template>
        <template v-slot:item.canErase="{ item }">
          <v-icon v-if="item.canErase">mdi-check</v-icon>
        </template>
        <template v-slot:item.canFinances="{ item }">
          <v-icon v-if="item.canFinances">mdi-check</v-icon>
        </template>
        <template v-slot:item.canPanels="{ item }">
          <v-icon v-if="item.canPanels">mdi-check</v-icon>
        </template>
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                :to="{
                  name: 'main-group-members-edit',
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
              <v-btn v-on="on" icon @click="deleteMember(item.id)">
                <v-icon color="red accent-1">mdi-delete-outline</v-icon>
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
import { memberModule } from "@/modules/member";
import { roleToString } from "@/utils/converters";
import { mainModule } from "@/modules/main";

@Component
export default class MembersView extends Vue {
  readonly mainContext = mainModule.context(this.$store);
  readonly groupContext = groupModule.context(this.$store);
  readonly memberContext = memberModule.context(this.$store);

  readonly roleToString = roleToString;

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
      text: "Role",
      value: "role",
    },
    {
      text: "Active",
      sortable: true,
      value: "isActive",
      align: "left",
      filterable: false,
      width: "100",
    },
    {
      text: "Orders",
      sortable: true,
      value: "canOrder",
      align: "left",
      filterable: false,
      width: "100",
    },
    {
      text: "Erase",
      sortable: true,
      value: "canErase",
      align: "left",
      filterable: false,
      width: "100",
    },
    {
      text: "Finances",
      sortable: true,
      value: "canFinances",
      align: "left",
      filterable: false,
      width: "100",
    },
    {
      text: "Panels",
      sortable: true,
      value: "canPanels",
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

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get items() {
    return this.memberContext.getters.members;
  }

  get groupRole() {
    return this.mainContext.getters.groupRole;
  }

  async mounted() {
    await this.memberContext.actions.getGroupMembers(+this.$router.currentRoute.params.groupId);
  }

  async deleteMember(id: number) {
    if (self.confirm("Are you sure you want to delete the group member?")) {
      await this.memberContext.actions.deleteMember(id);
    }
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
