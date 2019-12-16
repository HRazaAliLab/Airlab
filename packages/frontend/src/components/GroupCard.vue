<template functional>
  <v-card tile class="ma-6 pa-1">
    <v-card-title>
      <v-row no-gutters>
        <v-col>
          <h5 class="headline">{{ props.group.name }}</h5>
          <span class="caption"><v-icon small>mdi-link</v-icon> {{ props.group.url }}</span>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text v-if="props.group.institution">
      {{ props.group.institution }}
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" :to="{ name: 'main-group', params: { groupId: props.group.id } }">
        Open
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { UserDto } from "@airlab/shared/lib/user/dto";
import { GroupDto } from "@airlab/shared/lib/group/dto";

@Component
export default class GroupCard extends Vue {
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
}
</script>
