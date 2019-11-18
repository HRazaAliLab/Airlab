import { Getters } from "vuex-smart-module";
import { GroupState } from ".";

export class GroupGetters extends Getters<GroupState> {
  get groups() {
    return this.state.ids.map(id => this.state.entities[id]);
  }

  getGroup(id: number) {
    return this.state.entities[id];
  }

  get activeGroupId() {
    return this.state.activeGroupId;
  }

  get activeGroup() {
    return this.getters.activeGroupId ? this.getters.getGroup(this.getters.activeGroupId) : undefined;
  }
}
