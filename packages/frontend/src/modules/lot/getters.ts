import { Getters } from "vuex-smart-module";
import { LotState } from ".";

export class LotGetters extends Getters<LotState> {
  get lots() {
    return this.state.lots;
  }

  getLot(id?: number) {
    return this.lots.find(item => item.id === id);
  }
}
