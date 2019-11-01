import { Mutations } from "vuex-smart-module";
import { SpeciesState } from ".";
import { SpeciesDto } from "@airlab/shared/lib/species/dto";

export class SpeciesMutations extends Mutations<SpeciesState> {
  setSpecies(payload: SpeciesDto[]) {
    this.state.species = payload;
  }

  setOneSpecies(payload: SpeciesDto) {
    const items = this.state.species.filter(item => item.id !== payload.id);
    items.push(payload);
    this.state.species = items;
  }

  deleteSpecies(payload: SpeciesDto) {
    const items = this.state.species.filter(item => item.id !== payload.id);
    this.state.species = items;
  }

  reset() {}
}
