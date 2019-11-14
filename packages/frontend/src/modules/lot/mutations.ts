import { Mutations } from "vuex-smart-module";
import { lotListSchema, LotState } from ".";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import { normalize } from "normalizr";

export class LotMutations extends Mutations<LotState> {
  setEntities(payload: LotDto[]) {
    const normalizedData = normalize<LotDto>(payload, lotListSchema);
    this.state.ids = normalizedData.result;
    this.state.entities = normalizedData.entities.lots;
  }

  setEntity(payload: LotDto) {
    const existingId = this.state.ids.find(id => id === payload.id);
    if (!existingId) {
      this.state.ids = this.state.ids.concat(payload.id);
    }
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  addEntity(payload: LotDto) {
    this.state.ids = this.state.ids.concat(payload.id);
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  updateEntity(payload: LotDto) {
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
