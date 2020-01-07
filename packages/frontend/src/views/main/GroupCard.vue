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
      <v-btn v-if="isMember" color="primary" :to="{ name: 'main-group', params: { groupId: group.id } }">
        Open
      </v-btn>
      <v-btn v-else-if="group.isOpen" color="primary" @click="joinGroup()">
        Request Access
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { UserDto } from "@airlab/shared/lib/user/dto";
import { GroupDto } from "@airlab/shared/lib/group/dto";
import { groupModule } from "@/modules/group";

@Component
export default class GroupCard extends Vue {
  readonly groupContext = groupModule.context(this.$store);

  @Prop({
    type: Object,
    required: true,
  })
  readonly user!: UserDto;

  @Prop({
    type: Object,
    required: true,
  })
  readonly group!: GroupDto;

  get userIds() {
    return (this.group as any).members ? (this.group as any).members.map(member => member.userId) : [];
  }

  get isMember() {
    return this.userIds.includes(this.user.id);
  }

  async joinGroup() {
    await this.groupContext.actions.joinGroup(this.group.id);
  }
}
</script>
