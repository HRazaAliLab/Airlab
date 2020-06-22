import { Mutations } from "vuex-smart-module";
import { proteinListSchema, ProteinState } from ".";
import { ProteinDto } from "@airlab/shared/lib/protein/dto";
import { normalize } from "normalizr";

export class ProteinMutations extends Mutations<ProteinState> {
  setEntities(payload: ProteinDto[]) {
    const normalizedData = normalize<ProteinDto>(payload, proteinListSchema);
    this.state.ids = normalizedData.result;
    this.state.entities = normalizedData.entities.proteins ? Object.freeze(normalizedData.entities.proteins) : {};
  }

  setEntity(payload: ProteinDto) {
    const existingId = this.state.ids.find((id) => id === payload.id);
    if (!existingId) {
      this.state.ids = this.state.ids.concat(payload.id);
    }
    this.state.entities = Object.freeze({ ...this.state.entities, [payload.id]: payload });
  }

  addEntity(payload: ProteinDto) {
    this.state.ids = this.state.ids.concat(payload.id);
    this.state.entities = Object.freeze({ ...this.state.entities, [payload.id]: payload });
  }

  updateEntity(payload: ProteinDto) {
    this.state.entities = Object.freeze({ ...this.state.entities, [payload.id]: payload });
  }

  deleteEntity(id: number) {
    this.state.ids = this.state.ids.filter((item) => item !== id);
    const entities = { ...this.state.entities };
    delete entities[id];
    this.state.entities = Object.freeze(entities);
  }

  reset() {
    // acquire initial state
    const s = new ProteinState();
    Object.keys(s).forEach((key) => {
      this.state[key] = s[key];
    });
  }
}
