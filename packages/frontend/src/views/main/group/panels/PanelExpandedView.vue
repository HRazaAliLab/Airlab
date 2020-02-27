<template>
  <v-card flat class="my-2">
    <v-card-text class="subtitle-2">Conjugate Elements</v-card-text>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      :items-per-page="-1"
      hide-default-footer
      disable-filtering
      dense
    >
      <template v-slot:item.dilutionType="{ item }">
        {{ dilutionTypeToString(item.dilutionType) }}
      </template>
      <template v-slot:item.tubeNumber="{ item }">
        <router-link
          class="link"
          :to="{
            name: 'main-group-conjugates-edit',
            params: {
              groupId: activeGroupId,
              id: item.conjugate.id,
            },
          }"
        >
          {{ item.conjugate.tubeNumber }}
        </router-link>
      </template>
      <template v-slot:item.lot="{ item }">
        <router-link
          class="link"
          :to="{
            name: 'main-group-lots-edit',
            params: {
              groupId: activeGroupId,
              id: item.conjugate.lot.id,
            },
          }"
        >
          {{ item.conjugate.lot.name }}
        </router-link>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { PanelDto, PanelElementDataDto } from "@airlab/shared/lib/panel/dto";
import { panelModule } from "@/modules/panel";
import { dilutionTypeToString } from "@/utils/converters";

@Component
export default class PanelExpandedView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly panelContext = panelModule.context(this.$store);

  readonly dilutionTypeToString = dilutionTypeToString;

  @Prop(Object) readonly panel!: PanelDto;

  private readonly headers = [
    {
      text: "Tube Number",
      value: "tubeNumber",
    },
    {
      text: "Lot",
      value: "lot",
    },
    {
      text: "Dilution Type",
      value: "dilutionType",
    },
    {
      text: "Concentration",
      value: "concentration",
      align: "end",
    },
  ];

  private loading = true;
  private items: PanelElementDataDto[] = [];

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.items = await this.panelContext.actions.getPanelElements(this.panel.id);
    this.loading = false;
  }
}
</script>
