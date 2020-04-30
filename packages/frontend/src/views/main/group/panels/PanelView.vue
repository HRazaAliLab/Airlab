<template>
  <LoadingView v-if="!panel" text="Loading panel details..." />
  <v-card v-else tile elevation="1">
    <v-card-text>
      <div><span class="subheader">ID: </span>{{ panel.id }}</div>
      <div><span class="subheader">Name: </span>{{ panel.name }}</div>
      <div><span class="subheader">Description: </span>{{ panel.description }}</div>
      <div>
        <span class="subheader">Created By: </span>
        <router-link
          class="link"
          :to="{
            name: 'main-admin-users-edit',
            params: {
              groupId: activeGroupId,
              id: panel.user.id,
            },
          }"
        >
          {{ panel.user.name }}
        </router-link>
      </div>
      <div v-if="panel.application">
        <span class="subheader">Application: </span>
        <v-chip color="blue lighten-3" small disabled class="chip">
          {{ applicationToString(panel.application) }}
        </v-chip>
      </div>
      <v-checkbox label="Fluorophore" v-model="panel.isFluorophore" readonly hide-details />
      <v-checkbox label="Locked" v-model="panel.isLocked" readonly hide-details />
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        text
        :to="{
          name: 'main-group-panels-edit',
          params: {
            groupId: activeGroupId,
            id: panel.id,
          },
        }"
      >
        Edit
      </v-btn>
      <v-btn v-if="isGroupAdmin" color="secondary" text @click="deletePanel()">
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import LoadingView from "@/components/LoadingView.vue";
import { panelModule } from "@/modules/panel";
import { applicationToString } from "@/utils/converters";

@Component({
  components: { LoadingView },
})
export default class PanelView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly panelContext = panelModule.context(this.$store);

  private readonly applicationToString = applicationToString;

  @Prop({
    type: Number,
    required: true,
  })
  readonly panelId!: number;

  private get isGroupAdmin() {
    return this.groupContext.getters.isGroupAdmin;
  }

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  private get panel() {
    return this.panelContext.getters.getPanel(this.panelId);
  }

  private async deletePanel() {
    if (self.confirm("Are you sure you want to delete the panel?")) {
      await this.panelContext.actions.deletePanel(this.panelId);
    }
  }

  async mounted() {
    await this.panelContext.actions.getPanel(this.panelId);
  }
}
</script>

<style scoped>
.subheader {
  font-weight: bold;
}
.chip {
  opacity: 1;
}
</style>
