import { Mutations } from "vuex-smart-module";
import { speciesListSchema, SpeciesState } from ".";
import { SpeciesDto } from "@airlab/shared/lib/species/dto";
import { normalize } from "normalizr";

export class SpeciesMutations extends Mutations<SpeciesState> {
  setEntities(payload: SpeciesDto[]) {
    const normalizedData = normalize<SpeciesDto>(payload, speciesListSchema);
    this.state.ids = normalizedData.result;
    this.state.entities = normalizedData.entities.species;
  }

  setEntity(payload: SpeciesDto) {
    const existingId = this.state.ids.find(id => id === payload.id);
    if (!existingId) {
      this.state.ids = this.state.ids.concat(payload.id);
    }
    this.state.entities[payload.id] = payload;
  }

  addEntity(payload: SpeciesDto) {
    this.state.ids = this.state.ids.concat(payload.id);
    this.state.entities[payload.id] = payload;
  }

  updateEntity(payload: SpeciesDto) {
    this.state.entities[payload.id] = payload;
  }

  deleteEntity(id: number) {
    this.state.ids = this.state.ids.filter(item => item !== id);
    const entities = Object.assign({}, this.state.entities);
    delete entities[id];
    this.state.entities = entities;
  }

  reset() {
    this.state.ids = [];
    this.state.entities = {};
  }
}
