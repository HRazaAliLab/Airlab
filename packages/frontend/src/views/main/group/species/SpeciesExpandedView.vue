<template>
  <v-tabs v-model="tab" class="my-1">
    <v-tab>Hosts</v-tab>
    <v-tab>Reactivity</v-tab>
    <v-tab-item>
      <v-data-table
        :headers="headers"
        :items="hostItems"
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
        <template v-slot:item.protein="{ item }">
          <router-link
            v-if="item.protein"
            class="link"
            :to="{
              name: 'main-group-proteins-edit',
              params: {
                groupId: activeGroupId,
                id: item.protein.id,
              },
            }"
          >
            {{ item.protein.name }}
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
    <v-tab-item>
      <v-data-table
        :headers="headers"
        :items="reactivityItems"
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
        <template v-slot:item.protein="{ item }">
          <router-link
            v-if="item.protein"
            class="link"
            :to="{
              name: 'main-group-proteins-edit',
              params: {
                groupId: activeGroupId,
                id: item.protein.id,
              },
            }"
          >
            {{ item.protein.name }}
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
import { CloneDto } from "@airlab/shared/lib/clone/dto";
import { groupModule } from "@/modules/group";
import { SpeciesDto } from "@airlab/shared/lib/species/dto";
import { speciesModule } from "@/modules/species";
import { getStatusColor } from "@/utils/converters";
import { cloneModule } from "@/modules/clone";

@Component
export default class SpeciesExpandedView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly cloneContext = cloneModule.context(this.$store);
  private readonly speciesContext = speciesModule.context(this.$store);

  private readonly getStatusColor = getStatusColor;

  @Prop(Object) readonly species!: SpeciesDto;

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
      text: "Protein",
      value: "protein",
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

  private tab = 0;
  private loading = true;
  private hostItems: CloneDto[] = [];

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  private get clones() {
    return this.cloneContext.getters.clones;
  }

  private get reactivityItems() {
    return this.clones.filter((item) => {
      if (item.reactivity.includes(this.species.id)) {
        return item;
      }
    });
  }

  async mounted() {
    const result = await Promise.all([
      this.speciesContext.actions.getSpeciesClones(this.species.id),
      this.cloneContext.actions.getGroupClones(this.activeGroupId!),
    ]);
    this.hostItems = result[0];
    this.loading = false;
  }
}
</script>
