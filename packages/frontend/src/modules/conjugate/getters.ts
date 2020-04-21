import { Getters } from "vuex-smart-module";
import { ConjugateState } from ".";

export class ConjugateGetters extends Getters<ConjugateState> {
  get conjugates() {
    return this.state.ids.map((id) => this.state.entities[id]);
  }

  getConjugate(id: number) {
    return this.state.entities[id];
  }

  getConjugatesForTag(tagId: number) {
    return this.getters.conjugates.filter((item) => item.tagId === tagId);
  }
}
