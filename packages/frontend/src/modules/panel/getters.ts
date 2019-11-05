import { Getters } from "vuex-smart-module";
import { PanelState } from ".";

export class PanelGetters extends Getters<PanelState> {
  get panels() {
    return this.state.panels;
  }

  getPanel(id?: number) {
    return this.panels.find(item => item.id === id);
  }
}
