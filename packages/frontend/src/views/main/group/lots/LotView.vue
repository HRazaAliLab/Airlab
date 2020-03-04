<template>
  <LoadingView v-if="!lot" text="Loading lot details..." />
  <v-card v-else tile elevation="1">
    <v-card-text>
      <div><span class="subheader">Name: </span>{{ lot.name }}</div>
      <div><span class="subheader">Lot Number: </span>{{ lot.number }}</div>
      <div><span class="subheader">Reference: </span>{{ lot.reference }}</div>
      <div>
        <span class="subheader">Status: </span>
        <v-chip :color="getLotStatusColor(lot.status)" class="mr-1" x-small dark label>
          {{ lot.status | lotStatusToString }}
        </v-chip>
      </div>
      <div><span class="subheader">Purpose: </span>{{ lot.purpose }}</div>
      <div><span class="subheader">Price: </span>{{ lot.price }}</div>
      <div>
        <span class="subheader">Provider: </span>
        <router-link
          class="link"
          :to="{
            name: 'main-group-providers-edit',
            params: {
              groupId: activeGroupId,
              id: lot.provider.id,
            },
          }"
        >
          {{ lot.provider.name }}
        </router-link>
      </div>
      <div><span class="subheader">Note: </span>{{ lot.note }}</div>
      <div>
        <span class="subheader">URL: </span><a target="_blank" :href="lot.url">{{ lot.url }}</a>
      </div>
    </v-card-text>

    <v-divider class="mx-4" />

    <v-list dense flat>
      <v-list-item v-if="lot.requestedAt">
        <v-list-item-icon>
          <v-icon color="blue">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ `Requested ${new Date(lot.requestedAt).toUTCString()}` }}</v-list-item-title>
          <v-list-item-subtitle v-if="lot.requestedBy">{{ `by ${lot.requestedBy}` }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="lot.approvedAt">
        <v-list-item-icon>
          <v-icon color="purple">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ `Approved ${new Date(lot.approvedAt).toUTCString()}` }}</v-list-item-title>
          <v-list-item-subtitle v-if="lot.approvedBy">{{ `by ${lot.approvedBy}` }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="lot.orderedAt">
        <v-list-item-icon>
          <v-icon color="green">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ `Ordered ${new Date(lot.orderedAt).toUTCString()}` }}</v-list-item-title>
          <v-list-item-subtitle v-if="lot.orderedBy">{{ `by ${lot.orderedBy}` }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="lot.receivedAt">
        <v-list-item-icon>
          <v-icon color="orange">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ `Received ${new Date(lot.receivedAt).toUTCString()}` }}</v-list-item-title>
          <v-list-item-subtitle v-if="lot.receivedBy">{{ `by ${lot.receivedBy}` }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="lot.finishedAt">
        <v-list-item-icon>
          <v-icon color="red">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ `Finished ${new Date(lot.finishedAt).toUTCString()}` }}</v-list-item-title>
          <v-list-item-subtitle v-if="lot.finishedBy">{{ `by ${lot.finishedBy}` }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-actions>
      <v-btn
        color="primary"
        text
        :to="{
          name: 'main-group-lots-edit',
          params: {
            groupId: activeGroupId,
            id: lot.id,
          },
        }"
      >
        Edit
      </v-btn>
      <v-btn color="secondary" text @click="deleteLot()">
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { lotModule } from "@/modules/lot";
import LoadingView from "@/components/LoadingView.vue";
import { groupModule } from "@/modules/group";
import { getLotStatusColor } from "@/utils/converters";

@Component({
  components: { LoadingView },
})
export default class LotView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly lotContext = lotModule.context(this.$store);

  private readonly getLotStatusColor = getLotStatusColor;

  @Prop({
    type: Number,
    required: true,
  })
  readonly lotId!: number;

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  private get lot() {
    return this.lotContext.getters.getLot(this.lotId);
  }

  private async deleteLot() {
    if (self.confirm("Are you sure you want to delete the lot?")) {
      await this.lotContext.actions.deleteLot(this.lotId);
    }
  }

  async mounted() {
    await this.lotContext.actions.getLot(this.lotId);
  }
}
</script>

<style scoped>
.subheader {
  font-weight: bold;
}
.deleted {
  color: palevioletred;
}
</style>
