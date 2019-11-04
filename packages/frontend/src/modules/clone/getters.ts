import { Getters } from "vuex-smart-module";
import { CloneState } from ".";

export class CloneGetters extends Getters<CloneState> {
  get clones() {
    return this.state.clones;
  }

  getClone(id?: number) {
    return this.clones.find(item => item.id === id);
  }
}
