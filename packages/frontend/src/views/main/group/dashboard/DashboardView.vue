<template>
  <v-container fluid>
    <v-row class="mt-6 mx-6">
      <v-col>
        <RecentOrders />
      </v-col>
      <v-col>

      </v-col>
    </v-row>
    <v-row class="mt-6 mx-6">
      <v-col>

      </v-col>
      <v-col>

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { mainModule } from "@/modules/main";
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import RecentOrders from "@/views/main/group/dashboard/RecentOrders.vue";

@Component({
  components: { RecentOrders },
})
export default class DashboardView extends Vue {
  readonly mainContext = mainModule.context(this.$store);
  readonly groupContext = groupModule.context(this.$store);

  search = "";

  get userProfile() {
    return this.mainContext.getters.userProfile;
  }

  get groups() {
    const items = this.search
      ? this.groupContext.getters.groups.filter((item) => item.name.toLowerCase().includes(this.search.toLowerCase()))
      : this.groupContext.getters.groups;
    return items;
  }

  async mounted() {
    await this.groupContext.actions.getGroups();
  }
}
</script>
