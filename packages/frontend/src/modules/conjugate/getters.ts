import { Getters } from "vuex-smart-module";
import { ConjugateState } from ".";

export class ConjugateGetters extends Getters<ConjugateState> {
  get conjugates() {
    return this.state.conjugates;
  }

  getConjugate(id?: number) {
    return this.conjugates.find(item => item.id === id);
  }
}
