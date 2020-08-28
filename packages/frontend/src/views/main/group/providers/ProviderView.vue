<template>
  <LoadingView v-if="!provider" text="Loading provider details..." />
  <v-card v-else tile elevation="1">
    <v-card-text>
      <div><span class="subheader">ID: </span>{{ provider.id }}</div>
      <div><span class="subheader">Name: </span>{{ provider.name }}</div>
      <div><span class="subheader">Description: </span>{{ provider.description }}</div>
      <div>
        <span class="subheader">URL: </span><a target="_blank" :href="provider.url">{{ provider.url }}</a>
      </div>
      <div><span class="subheader">Created: </span>{{ new Date(provider.createdAt).toUTCString() }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        text
        :to="{
          name: 'main-group-providers-edit',
          params: {
            groupId: activeGroupId,
            id: provider.id,
          },
        }"
      >
        Edit
      </v-btn>
      <v-btn v-if="isGroupAdmin" color="secondary" text @click="deleteProvider()">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import LoadingView from "@/components/LoadingView.vue";
import { providerModule } from "@/modules/provider";

@Component({
  components: { LoadingView },
})
export default class ProviderView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly providerContext = providerModule.context(this.$store);

  @Prop({
    type: Number,
    required: true,
  })
  readonly providerId!: number;

  private get isGroupAdmin() {
    return this.groupContext.getters.isGroupAdmin;
  }

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  private get provider() {
    return this.providerContext.getters.getProvider(this.providerId);
  }

  private async deleteProvider() {
    if (self.confirm("Are you sure you want to delete the provider?")) {
      await this.providerContext.actions.deleteProvider(this.providerId);
    }
  }

  async mounted() {
    await this.providerContext.actions.getProvider(this.providerId);
  }
}
</script>

<style scoped>
.subheader {
  font-weight: bold;
}
</style>
