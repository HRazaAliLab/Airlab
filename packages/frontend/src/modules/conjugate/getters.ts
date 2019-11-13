import { Getters } from "vuex-smart-module";
import { ConjugateState } from ".";

export class ConjugateGetters extends Getters<ConjugateState> {
  get conjugates() {
    return Object.values(this.state.entities);
  }

  getConjugate(id: number) {
    return this.state.entities[id];
  }
}
