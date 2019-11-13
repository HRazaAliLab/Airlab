import { Getters } from "vuex-smart-module";
import { LotState } from ".";

export class LotGetters extends Getters<LotState> {
  get lots() {
    return Object.values(this.state.entities);
  }

  getLot(id: number) {
    return this.state.entities[id];
  }
}
