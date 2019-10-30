import { Mutations } from "vuex-smart-module";
import { GroupState } from ".";
import { GroupDto } from "@airlab/shared/lib/group/dto";

export class GroupMutations extends Mutations<GroupState> {
  setGroups(payload: GroupDto[]) {
    this.state.groups = payload;
  }

  setGroup(payload: GroupDto) {
    const items = this.state.groups.filter(item => item.id !== payload.id);
    items.push(payload);
    this.state.groups = items;
  }

  setActiveGroupId(id?: number) {
    this.state.activeGroupId = id;
  }

  deleteGroup(payload: GroupDto) {
    const items = this.state.groups.filter(item => item.id !== payload.id);
    this.state.groups = items;
  }

  reset() {
    this.state.activeGroupId = undefined;
  }
}
