import { Mutations } from "vuex-smart-module";
import { providerListSchema, ProviderState } from ".";
import { ProviderDto } from "@airlab/shared/lib/provider/dto";
import { normalize } from "normalizr";

export class ProviderMutations extends Mutations<ProviderState> {
  setEntities(payload: ProviderDto[]) {
    const normalizedData = normalize<ProviderDto>(payload, providerListSchema);
    this.state.ids = normalizedData.result;
    this.state.entities = normalizedData.entities.providers ? Object.freeze(normalizedData.entities.providers) : {};
  }

  setEntity(payload: ProviderDto) {
    const existingId = this.state.ids.find((id) => id === payload.id);
    if (!existingId) {
      this.state.ids = this.state.ids.concat(payload.id);
    }
    this.state.entities = Object.freeze({ ...this.state.entities, [payload.id]: payload });
  }

  addEntity(payload: ProviderDto) {
    this.state.ids = this.state.ids.concat(payload.id);
    this.state.entities = Object.freeze({ ...this.state.entities, [payload.id]: payload });
  }

  updateEntity(payload: ProviderDto) {
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
    const s = new ProviderState();
    Object.keys(s).forEach((key) => {
      this.state[key] = s[key];
    });
  }
}
