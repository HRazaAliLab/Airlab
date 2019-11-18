import { Getters } from "vuex-smart-module";
import { ProteinState } from ".";

export class ProteinGetters extends Getters<ProteinState> {
  get proteins() {
    return this.state.ids.map(id => this.state.entities[id]);
  }

  getProtein(id: number) {
    return this.state.entities[id];
  }
}
