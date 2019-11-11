import { Getters } from "vuex-smart-module";
import { ReagentState } from ".";

export class ReagentGetters extends Getters<ReagentState> {
  get reagents() {
    return this.state.reagents;
  }

  getReagent(id?: number) {
    return this.reagents.find(item => item.id === id);
  }
}
