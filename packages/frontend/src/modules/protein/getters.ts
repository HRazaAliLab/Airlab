import { Getters } from "vuex-smart-module";
import { ProteinState } from ".";

export class ProteinGetters extends Getters<ProteinState> {
  get proteins() {
    return Object.values(this.state.entities);
  }

  getProtein(id: number) {
    return this.state.entities[id];
  }
}
