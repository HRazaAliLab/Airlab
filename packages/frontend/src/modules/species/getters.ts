import { Getters } from "vuex-smart-module";
import { SpeciesState } from ".";

export class SpeciesGetters extends Getters<SpeciesState> {
  get species() {
    return this.state.species;
  }

  getSpecies(id?: number) {
    return this.species.find(item => item.id === id);
  }
}
