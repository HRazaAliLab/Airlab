<template>
  <v-card flat class="my-2">
    <v-card-text class="subtitle-2">Panels</v-card-text>
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
            name: 'main-group-panels-edit',
            params: {
              groupId: activeGroupId,
              id: item.id,
            },
          }"
        >
          {{ item.id }}
        </router-link>
      </template>
      <template v-slot:item.application="{ item }">
        {{ item.application | applicationToString }}
      </template>
      <template v-slot:item.isFluorophore="{ item }">
        <v-icon v-if="item.isFluorophore">mdi-check</v-icon>
      </template>
      <template v-slot:item.isLocked="{ item }">
        <v-icon v-if="item.isLocked">mdi-lock-outline</v-icon>
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
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { conjugateModule } from "@/modules/conjugate";
import { PanelDto } from "@airlab/shared/lib/panel/dto";
import { applicationToString } from "@/utils/converters";

@Component
export default class ConjugateExpandedView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly conjugateContext = conjugateModule.context(this.$store);

  @Prop(Object) readonly conjugate!: ConjugateDto;

  private readonly headers = [
    {
      text: "Id",
      value: "id",
      align: "end",
      filterable: false,
      width: "80",
    },
    {
      text: "Name",
      value: "name",
    },
    {
      text: "Description",
      value: "description",
    },
    {
      text: "Fluorophore",
      value: "isFluorophore",
      filterable: false,
    },
    {
      text: "Locked",
      value: "isLocked",
      filterable: false,
    },
    {
      text: "Application",
      value: "application",
      filterable: false,
      sort: (a, b) => {
        if (a === null) {
          return 1;
        }
        if (b === null) {
          return -1;
        }
        return applicationToString(a).localeCompare(applicationToString(b));
      },
    },
    {
      text: "Created by",
      value: "user",
      sort: (a, b) => a.name.localeCompare(b.name),
    },
  ];

  private loading = true;
  private items: PanelDto[] = [];

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.items = await this.conjugateContext.actions.getConjugatePanels(this.conjugate.id);
    this.loading = false;
  }
}
</script>
