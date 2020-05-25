import { Mutations } from "vuex-smart-module";
import { cloneListSchema, CloneState } from ".";
import { CloneDto } from "@airlab/shared/lib/clone/dto";
import { normalize } from "normalizr";

export class CloneMutations extends Mutations<CloneState> {
  setEntities(payload: CloneDto[]) {
    const normalizedData = normalize<CloneDto>(payload, cloneListSchema);
    this.state.ids = normalizedData.result;
    this.state.entities = normalizedData.entities.clones ? normalizedData.entities.clones : {};
  }

  setEntity(payload: CloneDto) {
    const existingId = this.state.ids.find((id) => id === payload.id);
    if (!existingId) {
      this.state.ids = this.state.ids.concat(payload.id);
    }
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  addEntity(payload: CloneDto) {
    this.state.ids = this.state.ids.concat(payload.id);
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  updateEntity(payload: CloneDto) {
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  deleteEntity(id: number) {
    this.state.ids = this.state.ids.filter((item) => item !== id);
    const entities = { ...this.state.entities };
    delete entities[id];
    this.state.entities = entities;
  }

  reset() {
    // acquire initial state
    const s = new CloneState();
    Object.keys(s).forEach((key) => {
      this.state[key] = s[key];
    });
  }
}
