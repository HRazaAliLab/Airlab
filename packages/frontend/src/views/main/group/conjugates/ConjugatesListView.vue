<template>
  <LoadingView v-if="!items" text="Loading conjugates..." />
  <v-col v-else>
    <v-toolbar dense class="toolbar">
      <v-toolbar-title>Conjugates</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text :to="`/main/groups/${activeGroupId}/conjugates/create`" color="primary">Create Conjugate</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Filter</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-select
            v-model="tagFilter"
            :items="tags"
            item-text="name"
            item-value="id"
            chips
            clearable
            label="Tags"
            multiple
            prepend-icon="mdi-filter-outline"
            solo
            dense
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip v-bind="attrs" :input-value="selected" close @click="select" @click:close="removeTagFilter(item)">
                {{ item.name }}
              </v-chip>
            </template>
          </v-select>
          <v-select
            v-model="statusFilter"
            :items="statuses"
            item-text="name"
            item-value="id"
            chips
            clearable
            label="Status"
            multiple
            prepend-icon="mdi-filter-outline"
            solo
            dense
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="removeStatusFilter(item)"
              >
                {{ item.name }}
              </v-chip>
            </template>
          </v-select>
          <v-select
            v-model="validationApplicationFilter"
            :items="applications"
            item-text="text"
            item-value="value"
            chips
            clearable
            label="Validation Application"
            multiple
            prepend-icon="mdi-filter-outline"
            solo
            dense
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="removeValidationApplicationFilter(item)"
              >
                {{ item.text }}
              </v-chip>
            </template>
          </v-select>
          <v-select
            v-model="validationStatusFilter"
            :items="validationStatuses"
            item-text="text"
            item-value="value"
            chips
            clearable
            label="Validation Status"
            multiple
            prepend-icon="mdi-filter-outline"
            solo
            dense
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="removeValidationStatusFilter(item)"
              >
                {{ item.text }}
              </v-chip>
            </template>
          </v-select>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

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
        :custom-filter="filter"
        :items-per-page="15"
        :footer-props="{
          itemsPerPageOptions: [10, 15, 20, 100],
          showFirstLastPage: true,
          showCurrentPage: true,
        }"
        multi-sort
        show-expand
      >
        <template v-slot:item.lot.clone.protein="{ item }">
          <router-link
            class="link"
            :to="{
              name: 'main-group-proteins-edit',
              params: {
                groupId: activeGroupId,
                id: item.lot.clone.protein.id,
              },
            }"
          >
            {{ item.lot.clone.protein.name }}
          </router-link>
        </template>
        <template v-slot:item.lot.clone="{ item }">
          <router-link
            class="link"
            :to="{
              name: 'main-group-clones-edit',
              params: {
                groupId: activeGroupId,
                id: item.lot.clone.id,
              },
            }"
          >
            {{ item.lot.clone.name }}
          </router-link>
        </template>
        <template v-slot:item.lot="{ item }">
          <router-link
            class="link"
            :to="{
              name: 'main-group-lots-edit',
              params: {
                groupId: activeGroupId,
                id: item.lot.id,
              },
            }"
          >
            {{ item.lot.number }}
          </router-link>
        </template>
        <template v-slot:item.tag.name="{ item }">
          <router-link
            class="link"
            :to="{
              name: 'main-group-tags-edit',
              params: {
                groupId: activeGroupId,
                id: item.tag.id,
              },
            }"
          >
            {{ item.tag.name }}
          </router-link>
        </template>
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
        <template v-slot:item.status="{ item }">
          <v-chip :color="getConjugateStatusColor(item)" class="mr-1" small dark label>
            {{ item.status | conjugateStatusToString }}
          </v-chip>
        </template>
        <template v-slot:item.validations="{ item }">
          <v-chip
            v-for="validation in item.validations"
            :key="validation.id"
            :color="getStatusColor(validation)"
            class="mr-1"
            x-small
            dark
            @click.stop="showValidation(validation.id)"
          >
            {{ validation.application | applicationToString }}
          </v-chip>
        </template>
        <template v-slot:item.action="{ item }">
          <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item v-if="item.status !== 0" @click="updateConjugateStatus(item.id, 0)">
                <v-list-item-icon>
                  <v-icon color="green">mdi-flask-empty</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Mark as Stock</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="item.status !== 1" @click="updateConjugateStatus(item.id, 1)">
                <v-list-item-icon>
                  <v-icon color="orange">mdi-speedometer-slow</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Mark as Low</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="item.status !== 2" @click="updateConjugateStatus(item.id, 2)">
                <v-list-item-icon>
                  <v-icon color="red accent-1">mdi-flask-empty-remove-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Mark as Finished</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
              <v-list-item
                :to="{
                  name: 'main-group-validations-create',
                  params: {
                    groupId: activeGroupId,
                    cloneId: item.lot.clone.id,
                    lotId: item.lotId,
                    conjugateId: item.id,
                  },
                }"
              >
                <v-list-item-icon>
                  <v-icon color="primary">mdi-plus-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Add Validation</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
              <v-list-item
                :to="{
                  name: 'main-group-conjugates-edit',
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
              <v-list-item v-if="isGroupAdmin" @click="updateConjugateArchiveState(item.id, !item.isArchived)">
                <v-list-item-icon>
                  <v-icon color="red accent-1">{{
                    item.isArchived ? "mdi-archive-arrow-up-outline" : "mdi-archive-arrow-down-outline"
                  }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.isArchived ? "Unarchive" : "Archive" }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <!--              <v-list-item v-if="isGroupAdmin" @click="deleteConjugate(item.id)">-->
              <!--                <v-list-item-icon>-->
              <!--                  <v-icon color="red accent-1">mdi-delete-outline</v-icon>-->
              <!--                </v-list-item-icon>-->
              <!--                <v-list-item-content>-->
              <!--                  <v-list-item-title>Delete</v-list-item-title>-->
              <!--                </v-list-item-content>-->
              <!--              </v-list-item>-->
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
            <ConjugateExpandedView :conjugate="item" />
          </td>
        </template>
      </v-data-table>
    </v-card>
    <v-navigation-drawer v-model="drawer" right fixed temporary width="600">
      <ConjugateDetailsView v-if="drawer" :conjugate="detailsItem" />
    </v-navigation-drawer>
    <v-navigation-drawer v-model="validationDrawer" right fixed temporary width="600">
      <ValidationDetailsView v-if="validationDrawer" :validation-id="selectedValidationId" />
    </v-navigation-drawer>
  </v-col>
</template>

<script lang="ts">
import LoadingView from "@/components/LoadingView.vue";
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { conjugateModule } from "@/modules/conjugate";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { tagModule } from "@/modules/tag";
import ConjugateDetailsView from "@/views/main/group/conjugates/ConjugateDetailsView.vue";
import { getConjugateStatusColor, getStatusColor } from "@/utils/converters";
import ConjugateExpandedView from "@/views/main/group/conjugates/ConjugateExpandedView.vue";
import { ConjugateStatus } from "@airlab/shared/lib/conjugate/ConjugateStatus";
import { applicationEnum } from "@/utils/enums";
import ValidationDetailsView from "@/views/main/group/validations/ValidationDetailsView.vue";

@Component({
  components: {
    ValidationDetailsView,
    ConjugateExpandedView,
    ConjugateDetailsView,
    LoadingView,
  },
})
export default class ConjugatesListViews extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly tagContext = tagModule.context(this.$store);
  readonly conjugateContext = conjugateModule.context(this.$store);

  readonly getConjugateStatusColor = getConjugateStatusColor;
  readonly getStatusColor = getStatusColor;
  readonly applications = applicationEnum;
  readonly validationStatuses = [
    { value: 0, text: "Yes" },
    { value: 1, text: "So-So" },
    { value: 2, text: "No" },
    { value: 3, text: "Undefined" },
    { value: -1, text: "No validations" },
  ];

  readonly statuses = [
    { id: 0, name: "Stock" },
    { id: 1, name: "Low" },
    { id: 2, name: "Finished" },
  ];

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get isGroupAdmin() {
    return this.groupContext.getters.isGroupAdmin;
  }

  readonly headers = [
    // {
    //   text: "Id",
    //   value: "id",
    //   align: "end",
    //   filterable: false,
    //   width: "80",
    // },
    {
      text: "Tube Number",
      value: "tubeNumber",
      align: "end",
    },
    {
      text: "Protein",
      value: "lot.clone.protein",
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
      text: "Clone",
      value: "lot.clone",
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
      text: "Lot",
      value: "lot",
      sort: (a, b) => {
        if (a === null) {
          return 1;
        }
        if (b === null) {
          return -1;
        }
        return a.number.localeCompare(b.number);
      },
    },
    {
      text: "Tag",
      value: "tag.name",
    },
    {
      text: "Mass",
      value: "tag.mw",
      align: "end",
      filterable: false,
      width: 100,
    },
    {
      text: "Labeled by",
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
      text: "Stock Concentration",
      value: "concentration",
      align: "end",
      filterable: false,
    },
    {
      text: "Status",
      value: "status",
      filterable: false,
    },
    {
      text: "Validations",
      value: "validations",
      filterable: false,
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
  detailsItem: ConjugateDto | null = null;

  validationDrawer = false;
  selectedValidationId: number | null = null;

  search = "";

  tagFilter: number[] = [];
  statusFilter: number[] = [];
  validationApplicationFilter: number[] = [];
  validationStatusFilter: number[] = [];

  get tags() {
    return this.tagContext.getters.tags.map((item) => ({
      id: item.id,
      name: item.mw ? item.name + item.mw : item.name,
    }));
  }

  get items() {
    let items = this.conjugateContext.getters.conjugates;
    if (this.tagFilter.length > 0) {
      items = items.filter((item) => ((item as any).tag ? this.tagFilter.includes((item as any).tag.id) : false));
    }
    if (this.statusFilter.length > 0) {
      items = items.filter((item) => this.statusFilter.includes(item.status));
    }
    if (this.validationApplicationFilter.length > 0) {
      items = items.filter((item) => {
        for (const validation of (item as any).validations) {
          if (this.validationApplicationFilter.includes(validation.application)) {
            return true;
          }
        }
        return false;
      });
    }
    if (this.validationStatusFilter.length > 0) {
      items =
        this.validationApplicationFilter.length > 0
          ? items.filter((item) => {
              for (const validation of (item as any).validations) {
                if (
                  this.validationApplicationFilter.includes(validation.application) &&
                  this.validationStatusFilter.includes(validation.status)
                ) {
                  return true;
                }
              }
              return false;
            })
          : items.filter((item) => {
              if ((item as any).validations && (item as any).validations.length > 0) {
                for (const validation of (item as any).validations) {
                  if (this.validationStatusFilter.includes(validation.status)) {
                    return true;
                  }
                }
              } else {
                return this.validationStatusFilter.includes(-1);
              }
            });
    }
    return items;
  }

  filter(value, search, item) {
    if (!search) {
      return true;
    }
    const normalizedSearchTerm = search.toLowerCase().trim();
    return (
      item.tubeNumber.toString().indexOf(normalizedSearchTerm) !== -1 ||
      (item.lot ? item.lot.clone.protein.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.lot ? item.lot.clone.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.lot && item.lot.number ? item.lot.number.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.tag ? item.tag.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.user && item.user.name ? item.user.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false) ||
      (item.description ? item.description.toLowerCase().indexOf(normalizedSearchTerm) !== -1 : false)
    );
  }

  showDetails(item: ConjugateDto) {
    this.detailsItem = item;
    this.drawer = !this.drawer;
  }

  showValidation(id: number) {
    this.selectedValidationId = id;
    this.validationDrawer = !this.validationDrawer;
  }

  async deleteConjugate(id: number) {
    if (self.confirm("Are you sure you want to delete the conjugate?")) {
      if (self.confirm("All children entities will be deleted!")) {
        await this.conjugateContext.actions.deleteConjugate(id);
      }
    }
  }

  async updateConjugateArchiveState(id: number, state: boolean) {
    if (self.confirm(`Are you sure you want to ${state ? "archive" : "unarchive"} the conjugate?`)) {
      await this.conjugateContext.actions.updateConjugateArchiveState({ id: id, data: { state: state } });
    }
  }

  async updateConjugateStatus(id: number, status: ConjugateStatus) {
    if (self.confirm(`Are you sure you want to change the conjugate status to ${ConjugateStatus[status]}?`)) {
      await this.conjugateContext.actions.updateConjugateStatus({ id: id, data: { status: status } });
    }
  }

  removeTagFilter(item) {
    this.tagFilter.splice(this.tagFilter.indexOf(item), 1);
    this.tagFilter = [...this.tagFilter];
  }

  removeStatusFilter(item) {
    this.statusFilter.splice(this.statusFilter.indexOf(item), 1);
    this.statusFilter = [...this.statusFilter];
  }

  removeValidationApplicationFilter(item) {
    this.validationApplicationFilter.splice(this.validationApplicationFilter.indexOf(item), 1);
    this.validationApplicationFilter = [...this.validationApplicationFilter];
  }

  removeValidationStatusFilter(item) {
    this.validationStatusFilter.splice(this.validationStatusFilter.indexOf(item), 1);
    this.validationStatusFilter = [...this.validationStatusFilter];
  }

  async mounted() {
    document.onkeydown = (evt) => {
      if (this.drawer && evt.key === "Escape") {
        this.drawer = false;
        this.validationDrawer = false;
      }
    };
    await Promise.all([
      this.conjugateContext.actions.getGroupConjugates(+this.$router.currentRoute.params.groupId),
      this.tagContext.actions.getGroupTags(+this.$router.currentRoute.params.groupId),
    ]);
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
