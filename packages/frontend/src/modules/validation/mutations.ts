import { Mutations } from "vuex-smart-module";
import { validationListSchema, ValidationState } from ".";
import { ValidationDto } from "@airlab/shared/lib/validation/dto";
import { normalize } from "normalizr";

export class ValidationMutations extends Mutations<ValidationState> {
  setEntities(payload: ValidationDto[]) {
    const normalizedData = normalize<ValidationDto>(payload, validationListSchema);
    this.state.ids = normalizedData.result;
    this.state.entities = normalizedData.entities.validations;
  }

  setEntity(payload: ValidationDto) {
    const existingId = this.state.ids.find(id => id === payload.id);
    if (!existingId) {
      this.state.ids = this.state.ids.concat(payload.id);
    }
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  addEntity(payload: ValidationDto) {
    this.state.ids = this.state.ids.concat(payload.id);
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  updateEntity(payload: ValidationDto) {
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
