import { Getters } from "vuex-smart-module";
import { GroupState } from ".";

export class GroupGetters extends Getters<GroupState> {
  get groups() {
    return this.state.groups;
  }

  getGroup(id?: number) {
    return this.groups.find(item => item.id === id);
  }

  get activeGroupId() {
    return this.state.activeGroupId;
  }

  get activeGroup() {
    return this.getGroup(this.activeGroupId);
  }
}
