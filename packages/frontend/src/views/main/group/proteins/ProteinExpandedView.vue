<template>
  <v-card flat class="my-2">
    <v-card-text class="text-subtitle-2">Clones</v-card-text>
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
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CloneDto } from "@airlab/shared/lib/clone/dto";
import { groupModule } from "@/modules/group";
import { getStatusColor } from "@/utils/converters";
import { proteinModule } from "@/modules/protein";
import { ProteinDto } from "@airlab/shared/lib/protein/dto";

@Component
export default class ProteinExpandedView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly proteinContext = proteinModule.context(this.$store);

  private readonly getStatusColor = getStatusColor;

  @Prop(Object) readonly protein!: ProteinDto;

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
  private items: CloneDto[] = [];

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.items = await this.proteinContext.actions.getProteinClones(this.protein.id);
    this.loading = false;
  }
}
</script>
