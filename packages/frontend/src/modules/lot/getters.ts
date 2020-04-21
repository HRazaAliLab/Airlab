import { Getters } from "vuex-smart-module";
import { LotState } from ".";

export class LotGetters extends Getters<LotState> {
  get lots() {
    return this.state.ids.map((id) => this.state.entities[id]);
  }

  getLot(id: number) {
    return this.state.entities[id];
  }
}
