<template>
  <v-card flat class="my-2">
    <v-card-text class="subtitle-2">Conjugates</v-card-text>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      :items-per-page="-1"
      hide-default-footer
      disable-filtering
      dense
    >
      <template v-slot:item.id="{ item }">
        <router-link
          class="link"
          :to="{
            name: 'main-group-conjugates-edit',
            params: {
              groupId: activeGroupId,
              id: item.id,
            },
          }"
        >
          {{ item.id }}
        </router-link>
      </template>
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
      <template v-slot:item.user="{ item }">
        <router-link
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
        <v-chip :color="getConjugateStatusColor(item)" class="mr-1" x-small dark label>
          {{ item.status | conjugateStatusToString }}
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { tagModule } from "@/modules/tag";
import { TagDto } from "@airlab/shared/lib/tag/dto";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { getConjugateStatusColor } from "@/utils/converters";

@Component
export default class TagExpandedView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly tagContext = tagModule.context(this.$store);

  private readonly getConjugateStatusColor = getConjugateStatusColor;

  @Prop(Object) readonly tag!: TagDto;

  private readonly headers = [
    {
      text: "Id",
      value: "id",
      align: "end",
      filterable: false,
      width: "80",
    },
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
      text: "Concentration",
      value: "concentration",
      align: "end",
    },
    {
      text: "Status",
      value: "status",
      filterable: false,
    },
  ];

  private loading = true;
  private items: ConjugateDto[] = [];

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.items = await this.tagContext.actions.getTagConjugates(this.tag.id);
    this.loading = false;
  }
}
</script>
