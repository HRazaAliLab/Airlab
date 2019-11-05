<template>
  <v-card tile class="ma-6 pa-1">
    <v-card-title>
      <v-row no-gutters>
        <v-col>
          <h5 class="headline">{{ group.name }}</h5>
          <span class="caption"><v-icon small>mdi-link</v-icon> {{ group.url }}</span>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text v-if="group.institution">
      {{ group.institution }}
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" :to="{ name: 'main-group', params: { groupId: group.id } }">
        Open
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mainModule } from "@/modules/main";
import { UserDto } from "@airlab/shared/lib/user/dto";
import { GroupDto } from "@airlab/shared/lib/group/dto";
import { groupModule } from "@/modules/group";

@Component
export default class GroupCard extends Vue {
  readonly mainContext = mainModule.context(this.$store);
  readonly groupContext = groupModule.context(this.$store);

  @Prop(Object) user!: UserDto;
  @Prop(Object) group!: GroupDto;

  get hasAdminAccess() {
    return this.mainContext.getters.hasAdminAccess;
  }

  async deleteGroup(event, id: number) {
    if (self.confirm("Are you sure you want to delete the group?")) {
      await this.groupContext.actions.deleteGroup(id);
    }
  }
}
</script>
