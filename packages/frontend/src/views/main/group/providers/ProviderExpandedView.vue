<template>
  <v-card flat class="my-2">
    <v-card-text class="subtitle-2">Lots</v-card-text>
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
            name: 'main-group-lots-edit',
            params: {
              groupId: activeGroupId,
              id: item.id,
            },
          }"
        >
          {{ item.id }}
        </router-link>
      </template>
      <template v-slot:item.clone="{ item }">
        <router-link
          class="link"
          :to="{
            name: 'main-group-clones-edit',
            params: {
              groupId: activeGroupId,
              id: item.clone.id,
            },
          }"
        >
          {{ item.clone.name }}
        </router-link>
      </template>
      <template v-slot:item.isLow="{ item }">
        <v-icon v-if="item.isLow" color="orange">mdi-flask-empty-remove-outline</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import { groupModule } from "@/modules/group";
import { providerModule } from "@/modules/provider";
import { ProviderDto } from "@airlab/shared/lib/provider/dto";

@Component
export default class ProviderExpandedView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly providerContext = providerModule.context(this.$store);

  @Prop(Object) readonly provider!: ProviderDto;

  private readonly headers = [
    {
      text: "Id",
      value: "id",
      align: "end",
      filterable: false,
      width: "80",
    },
    {
      text: "Number",
      value: "number",
    },
    {
      text: "Reference",
      value: "reference",
    },
    {
      text: "Name",
      value: "name",
    },
    {
      text: "Clone",
      value: "clone",
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
      text: "Status",
      value: "status",
    },
    {
      text: "Purpose",
      value: "purpose",
    },
    {
      text: "Low",
      value: "isLow",
      filterable: false,
    },
  ];

  private loading = true;
  private items: LotDto[] = [];

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.items = await this.providerContext.actions.getProviderLots(this.provider.id);
    this.loading = false;
  }
}
</script>
