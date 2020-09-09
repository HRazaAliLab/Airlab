<template>
  <v-tabs v-model="tab" class="my-1">
    <v-tab>Panels</v-tab>
    <v-tab>Clones</v-tab>
    <v-tab-item>
      <v-data-table
        :headers="panelsHeaders"
        :items="panels"
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
    </v-tab-item>
    <v-tab-item>
      <v-data-table
        :headers="clonesHeaders"
        :items="clones"
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
              name: 'main-group-clones-edit',
              params: {
                groupId: activeGroupId,
                id: item.id,
              },
            }"
          >
            {{ item.id }}
          </router-link>
        </template>
        <template v-slot:item.species="{ item }">
          <router-link
            class="link"
            :to="{
              name: 'main-group-species-edit',
              params: {
                groupId: activeGroupId,
                id: item.species.id,
              },
            }"
          >
            {{ item.species.name }}
          </router-link>
        </template>
        <template v-slot:item.isPhospho="{ item }">
          <v-icon v-if="item.isPhospho">mdi-check</v-icon>
        </template>
        <template v-slot:item.isPolyclonal="{ item }">
          <v-icon v-if="item.isPolyclonal">mdi-check</v-icon>
        </template>
        <template v-slot:item.validations="{ item }">
          <v-chip
            v-for="validation in item.validations"
            :key="validation.id"
            :color="getStatusColor(validation)"
            class="mr-1"
            x-small
            dark
          >
            {{ validation.application | applicationToString }}
          </v-chip>
        </template>
      </v-data-table>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { conjugateModule } from "@/modules/conjugate";
import { PanelDto } from "@airlab/shared/lib/panel/dto";
import { applicationToString, getStatusColor } from "@/utils/converters";
import { CloneDto } from "@airlab/shared/lib/clone/dto";

@Component
export default class ConjugateExpandedView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly conjugateContext = conjugateModule.context(this.$store);

  private readonly getStatusColor = getStatusColor;

  @Prop(Object) readonly conjugate!: ConjugateDto;

  private tab = 0;

  private readonly panelsHeaders = [
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

  private readonly clonesHeaders = [
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
      text: "Host",
      value: "species",
      sort: (a, b) => a.name.localeCompare(b.name),
    },
    {
      text: "Isotype",
      value: "isotype",
    },
    {
      text: "Phospho",
      value: "isPhospho",
      filterable: false,
    },
    {
      text: "Polyclonal",
      value: "isPolyclonal",
      filterable: false,
    },
    {
      text: "Validations",
      value: "validations",
      filterable: false,
    },
  ];

  private loading = true;
  private panels: PanelDto[] = [];
  private clones: PanelDto[] = [];

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    const result = await Promise.all([
      this.conjugateContext.actions.getConjugatePanels(this.conjugate.id),
      this.conjugateContext.actions.getConjugateClones(this.conjugate.id),
    ]);
    this.panels = result[0];
    this.clones = result[1];
    this.loading = false;
  }
}
</script>
