<template>
  <div>
    <v-toolbar dense light>
      <v-toolbar-title>
        Manage Tags
      </v-toolbar-title>
      <v-spacer />
      <v-btn small color="primary" to="/main/admin/tag/create">Create Tag</v-btn>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="tags"
      :items-per-page="15"
      :footer-props="{
        itemsPerPageOptions: [10, 15, 20, -1],
      }"
    >
      <template v-slot:item.isFluorphore="{ item }">
        <v-icon v-if="item.isFluorphore">mdi-check</v-icon>
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
                name: 'main-admin-tag-edit',
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
            <v-btn v-on="on" icon @click="deleteTag($event, item.id)">
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
import { tagModule } from "@/modules/tag";

@Component
export default class AdminTags extends Vue {
  readonly tagContext = tagModule.context(this.$store);

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
      text: "MW",
      sortable: true,
      value: "mw",
      align: "right",
    },
    {
      text: "Fluorphore",
      sortable: true,
      value: "isFluorphore",
      align: "left",
    },
    {
      text: "Metal",
      sortable: true,
      value: "isMetal",
      align: "left",
    },
    {
      text: "Actions",
      value: "action",
      sortable: false,
    },
  ];

  get tags() {
    return this.tagContext.getters.tags;
  }

  async mounted() {
    await this.tagContext.actions.getTags();
  }

  async deleteTag(event, id: number) {
    if (self.confirm("Are you sure you want to delete the tag?")) {
      await this.tagContext.actions.deleteTag(id);
    }
  }
}
</script>
