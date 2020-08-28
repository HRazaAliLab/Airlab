<template>
  <v-card>
    <v-card-title>Finished Lots</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        :loading="!items"
        disable-filtering
        disable-sort
        disable-pagination
        hide-default-footer
        dense
      >
        <template v-slot:item.provider="{ item }">
          {{ item.provider.name }}
        </template>
        <template v-slot:item.clone="{ item }">
          {{ item.clone.name }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { lotModule } from "@/modules/lot";
import { LotDto } from "@airlab/shared/lib/lot/dto";

@Component
export default class FinishedLots extends Vue {
  private readonly lotContext = lotModule.context(this.$store);

  private items: LotDto[] = [];

  private readonly headers = [
    {
      text: "Id",
      value: "id",
      align: "end",
      width: "80",
    },
    {
      text: "Name",
      value: "name",
    },
    {
      text: "Reference",
      value: "reference",
    },
    {
      text: "Provider",
      value: "provider",
    },
    {
      text: "Clone",
      value: "clone",
    },
  ];

  async mounted() {
    this.items = await this.lotContext.actions.getFinishedLots(+this.$router.currentRoute.params.groupId);
  }
}
</script>
