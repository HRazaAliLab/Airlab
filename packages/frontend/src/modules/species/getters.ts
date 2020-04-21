import { Getters } from "vuex-smart-module";
import { SpeciesState } from ".";

export class SpeciesGetters extends Getters<SpeciesState> {
  get species() {
    return this.state.ids.map((id) => this.state.entities[id]);
  }

  getSpecies(id: number) {
    return this.state.entities[id];
  }
}
