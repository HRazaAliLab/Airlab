<template>
  <v-col>
    <v-toolbar dense class="toolbar">
      <v-toolbar-title>
        Tags
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text :to="`/main/groups/${activeGroupId}/tags/create`" color="primary">Create Tag</v-btn>
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
        <template v-slot:item.isMetal="{ item }">
          <v-icon v-if="item.isMetal">mdi-check</v-icon>
        </template>
        <template v-slot:item.isFluorophore="{ item }">
          <v-icon v-if="item.isFluorophore">mdi-check</v-icon>
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
                  name: 'main-group-tags-edit',
                  params: {
                    groupId: activeGroupId,
                    id: item.id,
                  },
                }"
              >
                <v-list-item-icon>
                  <v-icon color="grey">mdi-pencil-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="isGroupAdmin" @click="deleteTag(item.id)">
                <v-list-item-icon>
                  <v-icon color="red accent-1">mdi-delete-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon @click.stop="showDetails(item)">
                <v-icon>mdi-information-outline</v-icon>
              </v-btn>
            </template>
            <span>Show details</span>
          </v-tooltip>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <TagExpandedView :tag="item" />
          </td>
        </template>
      </v-data-table>
    </v-card>
    <v-navigation-drawer v-model="drawer" right fixed temporary width="400">
      <TagDetailsView v-if="drawer" :tag="detailsItem" />
    </v-navigation-drawer>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { tagModule } from "@/modules/tag";
import { groupModule } from "@/modules/group";
import { TagDto } from "@airlab/shared/lib/tag/dto";
import TagDetailsView from "@/views/main/group/tags/TagDetailsView.vue";
import TagExpandedView from "@/views/main/group/tags/TagExpandedView.vue";

@Component({
  components: { TagExpandedView, TagDetailsView },
})
export default class TagsListView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
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
      text: "Metal",
      sortable: true,
      value: "isMetal",
      align: "left",
      filterable: false,
      width: "100",
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
      text: "MW",
      sortable: true,
      value: "mw",
      align: "right",
    },
    {
      text: "Emission",
      sortable: true,
      value: "emission",
      align: "right",
    },
    {
      text: "Excitation",
      sortable: true,
      value: "excitation",
      align: "right",
    },
    {
      text: "Actions",
      value: "action",
      sortable: false,
      filterable: false,
      width: "105",
    },
    {
      text: "",
      value: "data-table-expand",
    },
  ];

  drawer = false;
  detailsItem: TagDto | null = null;
  search = "";

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get isGroupAdmin() {
    return this.groupContext.getters.isGroupAdmin;
  }

  get items() {
    return this.tagContext.getters.tags;
  }

  showDetails(item: TagDto) {
    this.detailsItem = item;
    this.drawer = !this.drawer;
  }

  async mounted() {
    await this.tagContext.actions.getGroupTags(+this.$router.currentRoute.params.groupId);
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
