import { Mutations } from "vuex-smart-module";
import { conjugateListSchema, ConjugateState } from ".";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { normalize } from "normalizr";

export class ConjugateMutations extends Mutations<ConjugateState> {
  setEntities(payload: ConjugateDto[]) {
    const normalizedData = normalize<ConjugateDto>(payload, conjugateListSchema);
    this.state.ids = normalizedData.result;
    this.state.entities = normalizedData.entities.conjugates ? Object.freeze(normalizedData.entities.conjugates) : {};
  }

  setEntity(payload: ConjugateDto) {
    const existingId = this.state.ids.find((id) => id === payload.id);
    if (!existingId) {
      this.state.ids = this.state.ids.concat(payload.id);
    }
    this.state.entities = Object.freeze({ ...this.state.entities, [payload.id]: payload });
  }

  addEntity(payload: ConjugateDto) {
    this.state.ids = this.state.ids.concat(payload.id);
    this.state.entities = Object.freeze({ ...this.state.entities, [payload.id]: payload });
  }

  updateEntity(payload: ConjugateDto) {
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
    const s = new ConjugateState();
    Object.keys(s).forEach((key) => {
      this.state[key] = s[key];
    });
  }
}
