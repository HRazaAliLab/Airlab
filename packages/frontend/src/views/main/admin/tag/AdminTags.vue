<template>
  <v-col>
    <v-toolbar class="toolbar">
      <v-toolbar-title>
        Manage Tags
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text to="/main/admin/tags/create">Create Tag</v-btn>
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
        <template v-slot:item.isFluorophore="{ item }">
          <v-icon v-if="item.isFluorophore">mdi-check</v-icon>
        </template>
        <template v-slot:item.isMetal="{ item }">
          <v-icon v-if="item.isMetal">mdi-check</v-icon>
        </template>
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                :to="{
                  name: 'main-admin-tags-edit',
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
              <v-btn v-on="on" icon @click="deleteTag(item.id)">
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
import { tagModule } from "@/modules/tag";

@Component
export default class AdminTags extends Vue {
  readonly tagContext = tagModule.context(this.$store);

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
      text: "MW",
      sortable: true,
      value: "mw",
      align: "right",
    },
    {
      text: "Fluorophore",
      sortable: true,
      value: "isFluorophore",
      align: "left",
      filterable: false,
      width: "140",
    },
    {
      text: "Metal",
      sortable: true,
      value: "isMetal",
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
    return this.tagContext.getters.tags;
  }

  async mounted() {
    await this.tagContext.actions.getTags();
  }

  async deleteTag(id: number) {
    if (self.confirm("Are you sure you want to delete the tag?")) {
      await this.tagContext.actions.deleteTag(id);
    }
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
