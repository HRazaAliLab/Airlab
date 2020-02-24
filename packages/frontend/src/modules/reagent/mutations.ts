import { Mutations } from "vuex-smart-module";
import { reagentListSchema, ReagentState } from ".";
import { ReagentDto } from "@airlab/shared/lib/reagent/dto";
import { normalize } from "normalizr";

export class ReagentMutations extends Mutations<ReagentState> {
  setEntities(payload: ReagentDto[]) {
    const normalizedData = normalize<ReagentDto>(payload, reagentListSchema);
    this.state.ids = normalizedData.result;
    this.state.entities = normalizedData.entities.reagents ? normalizedData.entities.reagents : {};
  }

  setEntity(payload: ReagentDto) {
    const existingId = this.state.ids.find(id => id === payload.id);
    if (!existingId) {
      this.state.ids = this.state.ids.concat(payload.id);
    }
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  addEntity(payload: ReagentDto) {
    this.state.ids = this.state.ids.concat(payload.id);
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  updateEntity(payload: ReagentDto) {
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
