<template>
  <LoadingView v-if="!group" text="Loading..." />
  <v-container v-else fluid class="px-1 py-0">
    <v-tabs v-model="tab">
      <v-tab>Visualization</v-tab>
      <v-tab>Analysis</v-tab>
      <v-tab-item>
        VVV
      </v-tab-item>
      <v-tab-item>
        AAA
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script lang="ts">
import LoadingView from "@/components/LoadingView.vue";
import { mainModule } from "@/modules/main";
import { WebSocketManager } from "@/utils/WebSocketManager";
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";

@Component({
  components: {
    LoadingView,
  },
})
export default class GroupView extends Vue {
  readonly mainContext = mainModule.context(this.$store);
  readonly groupContext = groupModule.context(this.$store);

  tab = 0;

  get group() {
    return this.groupContext.getters.activeGroup;
  }

  get showWorkspace() {
    return this.mainContext.getters.showWorkspace;
  }

  get viewerColumns() {
    const cols = this.$vuetify.breakpoint.name === "xl" ? 10 : 9;
    return this.showWorkspace ? cols : 12;
  }

  async mounted() {
    const groupId = parseInt(this.$router.currentRoute.params.id, 10);
    this.groupContext.mutations.setActiveGroupId(groupId);
    await this.groupContext.actions.getGroup(groupId);
    // WebSocketManager.connect(groupId);
  }

  beforeDestroy() {
    // WebSocketManager.close();
    if (process.env.VUE_APP_ENV !== "development") {
      this.groupContext.mutations.reset();
    }
  }
}
</script>
