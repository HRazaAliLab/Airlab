import { Getters } from "vuex-smart-module";
import { PanelState } from ".";

export class PanelGetters extends Getters<PanelState> {
  get panels() {
    return this.state.ids.map((id) => this.state.entities[id]);
  }

  getPanel(id: number) {
    return this.state.entities[id];
  }

  get activePanelTag() {
    return this.state.activePanelTag;
  }
}
