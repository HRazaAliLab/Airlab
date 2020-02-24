import { Mutations } from "vuex-smart-module";
import { panelListSchema, PanelState } from ".";
import { PanelDto } from "@airlab/shared/lib/panel/dto";
import { normalize } from "normalizr";

export class PanelMutations extends Mutations<PanelState> {
  setEntities(payload: PanelDto[]) {
    const normalizedData = normalize<PanelDto>(payload, panelListSchema);
    this.state.ids = normalizedData.result;
    this.state.entities = normalizedData.entities.panels ? normalizedData.entities.panels : {};
  }

  setEntity(payload: PanelDto) {
    const existingId = this.state.ids.find(id => id === payload.id);
    if (!existingId) {
      this.state.ids = this.state.ids.concat(payload.id);
    }
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  addEntity(payload: PanelDto) {
    this.state.ids = [payload.id].concat(this.state.ids);
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  updateEntity(payload: PanelDto) {
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  deleteEntity(id: number) {
    this.state.ids = this.state.ids.filter(item => item !== id);
    const entities = { ...this.state.entities };
    delete entities[id];
    this.state.entities = entities;
  }

  reset() {
    this.state.ids = [];
    this.state.entities = {};
  }
}
