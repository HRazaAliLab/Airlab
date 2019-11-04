import { Getters } from "vuex-smart-module";
import { ProteinState } from ".";

export class ProteinGetters extends Getters<ProteinState> {
  get proteins() {
    return this.state.proteins;
  }

  getProtein(id?: number) {
    return this.proteins.find(item => item.id === id);
  }
}
