<template>
  <v-col>
    <v-toolbar dense class="toolbar">
      <v-toolbar-title>Groups</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn v-if="isAdmin" text @click="exportAllData" color="primary">
          <v-icon small left>mdi-cloud-download</v-icon>
          Export All Data
        </v-btn>
        <!--        <v-btn v-if="isAdmin" text @click="importAllData" color="primary">-->
        <!--          <v-icon small left>mdi-cloud-upload</v-icon>-->
        <!--          Import All Data-->
        <!--        </v-btn>-->
        <v-divider vertical />
        <v-btn v-if="isAdmin" text @click="importGroupData" color="primary">
          <v-icon small left>mdi-cloud-upload</v-icon>
          Import Group
        </v-btn>
        <v-btn v-if="isAdmin" text to="/main/admin/groups/create" color="primary">Create Group</v-btn>
      </v-toolbar-items>
      <input :multiple="false" class="visually-hidden" type="file" v-on:change="groupFiles" ref="groupFileInput" />
      <input :multiple="false" class="visually-hidden" type="file" v-on:change="allFiles" ref="allFileInput" />
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
          <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item
                :to="{
                  name: 'main-admin-groups-edit',
                  params: {
                    id: item.id,
                  },
                }"
              >
                <v-list-item-icon>
                  <v-icon color="primary">mdi-pencil-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="deleteGroup(item.id)">
                <v-list-item-icon>
                  <v-icon color="red accent-1">mdi-delete-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="exportGroupData(item.id)">
                <v-list-item-icon>
                  <v-icon color="grey">mdi-database-export</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Export</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { mainModule } from "@/modules/main";

@Component
export default class GroupsListView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
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
      width: "70",
    },
  ];

  search = "";

  get isAdmin() {
    return this.mainContext.getters.isAdmin;
  }

  get items() {
    return this.groupContext.getters.groups;
  }

  @Emit()
  async groupFiles(e): Promise<FileList> {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("file", file, file.name);
    e.target.value = "";
    await this.groupContext.actions.importGroupData({
      formData: formData,
    });
    return e.target.files;
  }

  @Emit()
  async allFiles(e): Promise<FileList> {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("file", file, file.name);
    e.target.value = "";
    await this.groupContext.actions.importAllData({
      formData: formData,
    });
    return e.target.files;
  }

  importGroupData() {
    (this.$refs.groupFileInput as HTMLElement).click();
  }

  importAllData() {
    (this.$refs.allFileInput as HTMLElement).click();
  }

  async mounted() {
    await this.groupContext.actions.getGroups();
  }

  async deleteGroup(id: number) {
    if (self.confirm("Delete the group?")) {
      if (self.confirm("Are you sure you want to delete the group?")) {
        await this.groupContext.actions.deleteGroup(id);
      }
    }
  }

  async exportGroupData(id: number) {
    if (self.confirm("Download all group data as .zip file?")) {
      await this.groupContext.actions.exportGroupData({
        id: id,
        format: "json",
      });
    }
  }

  async exportAllData() {
    if (self.confirm("Download all data as .zip file?")) {
      await this.groupContext.actions.exportAllData({
        format: "json",
      });
    }
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
.visually-hidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}
</style>
