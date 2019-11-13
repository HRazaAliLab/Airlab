import { Getters } from "vuex-smart-module";
import { ReagentState } from ".";

export class ReagentGetters extends Getters<ReagentState> {
  get reagents() {
    return Object.values(this.state.entities);
  }

  getReagent(id: number) {
    return this.state.entities[id];
  }
}
