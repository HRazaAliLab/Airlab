import { Getters } from "vuex-smart-module";
import { ReagentState } from ".";

export class ReagentGetters extends Getters<ReagentState> {
  get reagents() {
    return this.state.ids.map(id => this.state.entities[id]);
  }

  getReagent(id: number) {
    return this.state.entities[id];
  }
}
