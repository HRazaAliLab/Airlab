import { Getters } from "vuex-smart-module";
import { SpeciesState } from ".";

export class SpeciesGetters extends Getters<SpeciesState> {
  get species() {
    return Object.values(this.state.entities);
  }

  getSpecies(id: number) {
    return this.state.entities[id];
  }
}
