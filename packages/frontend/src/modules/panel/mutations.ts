import { Mutations } from "vuex-smart-module";
import { PanelState } from ".";
import { PanelDto } from "@airlab/shared/lib/panel/dto";

export class PanelMutations extends Mutations<PanelState> {
  setPanels(payload: PanelDto[]) {
    this.state.panels = payload;
  }

  setPanel(payload: PanelDto) {
    const items = this.state.panels.filter(item => item.id !== payload.id);
    items.push(payload);
    this.state.panels = items;
  }

  deletePanel(payload: PanelDto) {
    const items = this.state.panels.filter(item => item.id !== payload.id);
    this.state.panels = items;
  }

  deletePanelById(id: number) {
    const items = this.state.panels.filter(item => item.id !== id);
    this.state.panels = items;
  }

  reset() {
    this.state.panels = [];
  }
}
