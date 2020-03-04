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
      <template v-slot:item.provider="{ item }">
        <router-link
          v-if="item.provider"
          class="link"
          :to="{
            name: 'main-group-providers-edit',
            params: {
              groupId: activeGroupId,
              id: item.provider.id,
            },
          }"
        >
          {{ item.provider.name }}
        </router-link>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip :color="getLotStatusColor(item.status)" class="mr-1" x-small dark label>
          {{ item.status | lotStatusToString }}
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { cloneModule } from "@/modules/clone";
import { CloneDto } from "@airlab/shared/lib/clone/dto";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import { groupModule } from "@/modules/group";
import { getLotStatusColor } from "@/utils/converters";

@Component
export default class CloneExpandedView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly cloneContext = cloneModule.context(this.$store);

  private readonly getLotStatusColor = getLotStatusColor;

  @Prop(Object) readonly clone!: CloneDto;

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
      text: "Provider",
      value: "provider",
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
  ];

  private loading = true;
  private items: LotDto[] = [];

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.items = await this.cloneContext.actions.getCloneLots(this.clone.id);
    this.loading = false;
  }
}
</script>
