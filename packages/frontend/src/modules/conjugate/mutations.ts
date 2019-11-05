import { Mutations } from "vuex-smart-module";
import { ConjugateState } from ".";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";

export class ConjugateMutations extends Mutations<ConjugateState> {
  setConjugates(payload: ConjugateDto[]) {
    this.state.conjugates = payload;
  }

  setConjugate(payload: ConjugateDto) {
    const items = this.state.conjugates.filter(item => item.id !== payload.id);
    items.push(payload);
    this.state.conjugates = items;
  }

  deleteConjugate(payload: ConjugateDto) {
    const items = this.state.conjugates.filter(item => item.id !== payload.id);
    this.state.conjugates = items;
  }

  deleteConjugateById(id: number) {
    const items = this.state.conjugates.filter(item => item.id !== id);
    this.state.conjugates = items;
  }

  reset() {
    this.state.conjugates = [];
  }
}
