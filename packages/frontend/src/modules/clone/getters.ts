import { Getters } from "vuex-smart-module";
import { CloneState } from ".";

export class CloneGetters extends Getters<CloneState> {
  get clones() {
    return Object.values(this.state.entities);
  }

  getClone(id: number) {
    return this.state.entities[id];
  }
}
