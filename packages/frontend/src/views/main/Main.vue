<template>
  <div>
    <v-navigation-drawer
      :mini-variant="miniDrawer"
      mini-variant-width="60"
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="showDrawer"
      fixed
      app
      width="250"
    >
      <v-row no-gutters>
        <v-col>
          <v-list dense>
            <v-subheader class="grey--text text--darken-1">Main</v-subheader>
            <v-list-item to="/main/groups">
              <v-list-item-action>
                <v-icon>mdi-view-dashboard-outline</v-icon>
              </v-list-item-action>
              <v-list-item-title>Groups</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list dense subheader v-if="activeGroupId">
            <v-subheader class="grey--text text--darken-1">Group</v-subheader>
            <v-list-item :to="`/main/groups/${activeGroupId}/clones`">
              <v-list-item-action>
                <v-icon>mdi-content-duplicate</v-icon>
              </v-list-item-action>
              <v-list-item-title>Clones</v-list-item-title>
            </v-list-item>
            <v-list-item :to="`/main/groups/${activeGroupId}/lots`">
              <v-list-item-action>
                <v-icon>mdi-pound-box-outline</v-icon>
              </v-list-item-action>
              <v-list-item-title>Lots</v-list-item-title>
            </v-list-item>
            <v-list-item :to="`/main/groups/${activeGroupId}/conjugates`">
              <v-list-item-action>
                <v-icon>mdi-set-center</v-icon>
              </v-list-item-action>
              <v-list-item-title>Conjugates</v-list-item-title>
            </v-list-item>
            <v-list-item :to="`/main/groups/${activeGroupId}/validations`">
              <v-list-item-action>
                <v-icon>mdi-ab-testing</v-icon>
              </v-list-item-action>
              <v-list-item-title>Validations</v-list-item-title>
            </v-list-item>
            <v-list-item :to="`/main/groups/${activeGroupId}/panels`">
              <v-list-item-action>
                <v-icon>mdi-clipboard-outline</v-icon>
              </v-list-item-action>
              <v-list-item-title>Panels</v-list-item-title>
            </v-list-item>
            <v-list-item :to="`/main/groups/${activeGroupId}/reagents`">
              <v-list-item-action>
                <v-icon>mdi-test-tube</v-icon>
              </v-list-item-action>
              <v-list-item-title>Reagents</v-list-item-title>
            </v-list-item>
            <v-list-item :to="`/main/groups/${activeGroupId}/proteins`">
              <v-list-item-action>
                <v-icon>mdi-dna</v-icon>
              </v-list-item-action>
              <v-list-item-title>Proteins</v-list-item-title>
            </v-list-item>
            <v-list-item :to="`/main/groups/${activeGroupId}/tags`">
              <v-list-item-action>
                <v-icon>mdi-tag-outline</v-icon>
              </v-list-item-action>
              <v-list-item-title>Tags</v-list-item-title>
            </v-list-item>
            <v-list-item :to="`/main/groups/${activeGroupId}/providers`">
              <v-list-item-action>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-action>
              <v-list-item-title>Providers</v-list-item-title>
            </v-list-item>
            <v-list-item :to="`/main/groups/${activeGroupId}/species`">
              <v-list-item-action>
                <v-icon>mdi-rabbit</v-icon>
              </v-list-item-action>
              <v-list-item-title>Species</v-list-item-title>
            </v-list-item>
            <v-list-item :to="`/main/groups/${activeGroupId}/shop`">
              <v-list-item-action>
                <v-icon>mdi-cart-outline</v-icon>
              </v-list-item-action>
              <v-list-item-title>Shop</v-list-item-title>
            </v-list-item>
            <v-list-item :to="`/main/groups/${activeGroupId}/members`">
              <v-list-item-action>
                <v-icon>mdi-account-multiple-outline</v-icon>
              </v-list-item-action>
              <v-list-item-title>Members</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider v-if="hasAdminAccess" />
          <v-list dense subheader v-if="hasAdminAccess">
            <v-subheader class="grey--text text--darken-1">Admin</v-subheader>
            <v-list-item to="/main/admin/users">
              <v-list-item-action>
                <v-icon>mdi-account-outline</v-icon>
              </v-list-item-action>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item>
            <v-list-item to="/main/admin/groups">
              <v-list-item-action>
                <v-icon>mdi-account-multiple-outline</v-icon>
              </v-list-item-action>
              <v-list-item-title>Groups</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider />
          <v-list dense>
            <v-list-item @click="switchMiniDrawer">
              <v-list-item-action>
                <v-icon v-html="miniDrawer ? 'mdi-chevron-right' : 'mdi-chevron-left'" />
              </v-list-item-action>
              <v-list-item-title>Collapse</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <v-app-bar app dense dark color="primary" :clipped-left="$vuetify.breakpoint.lgAndUp" extension-height="0">
      <v-app-bar-nav-icon @click.stop="switchShowDrawer" />
      <v-toolbar-title @click.stop="$router.push({ name: 'main-groups' })" class="toolbar-title">{{
        appName
      }}</v-toolbar-title>
      <v-spacer />
      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item to="/main/profile">
            <v-list-item-title>Profile</v-list-item-title>
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
            <v-list-item-action>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>
      <ToolbarProgressBar
        :processing="processing"
        :progress="processingProgress"
        :indeterminate="false"
        color="light-blue lighten-2"
        slot="extension"
      />
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </div>
</template>

<script lang="ts">
import ToolbarProgressBar from "@/components/ToolbarProgressBar.vue";
import { appName } from "@/env";
import { mainModule } from "@/modules/main";
import { BroadcastManager } from "@/utils/BroadcastManager";
import { WebSocketManager } from "@/utils/WebSocketManager";
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";

const routeGuardMain = async (to, from, next) => {
  if (to.path === "/main") {
    next("/main/groups");
  } else {
    next();
  }
};
@Component({
  components: { ToolbarProgressBar },
})
export default class Main extends Vue {
  readonly mainContext = mainModule.context(this.$store);
  readonly groupContext = groupModule.context(this.$store);

  readonly appName = appName;

  beforeRouteEnter(to, from, next) {
    routeGuardMain(to, from, next);
  }

  beforeRouteUpdate(to, from, next) {
    routeGuardMain(to, from, next);
  }

  get miniDrawer() {
    return this.mainContext.getters.dashboardMiniDrawer;
  }

  get showDrawer() {
    return this.mainContext.getters.dashboardShowDrawer;
  }

  set showDrawer(value: boolean) {
    this.mainContext.mutations.setDashboardShowDrawer(value);
  }

  switchShowDrawer() {
    this.mainContext.mutations.setDashboardShowDrawer(!this.mainContext.getters.dashboardShowDrawer);
  }

  switchMiniDrawer() {
    this.mainContext.mutations.setDashboardMiniDrawer(!this.mainContext.getters.dashboardMiniDrawer);
  }

  get hasAdminAccess() {
    return this.mainContext.getters.hasAdminAccess;
  }

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async logout() {
    await this.mainContext.actions.userLogOut();
  }

  get processing() {
    return this.mainContext.getters.processing;
  }

  get processingProgress() {
    return this.mainContext.getters.processingProgress;
  }

  mounted() {
    WebSocketManager.init(this.$store);
    BroadcastManager.init(this.$store);
  }

  beforeDestroy() {
    WebSocketManager.close();
    BroadcastManager.close();
  }
}
</script>

<style scoped>
.toolbar-title {
  cursor: pointer;
}
</style>
