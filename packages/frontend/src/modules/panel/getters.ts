import { Getters } from "vuex-smart-module";
import { PanelState } from ".";

export class PanelGetters extends Getters<PanelState> {
  get panels() {
    return Object.values(this.state.entities);
  }

  getPanel(id: number) {
    return this.state.entities[id];
  }
}
