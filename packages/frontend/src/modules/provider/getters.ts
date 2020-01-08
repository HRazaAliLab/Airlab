import { Getters } from "vuex-smart-module";
import { ProviderState } from ".";

export class ProviderGetters extends Getters<ProviderState> {
  get providers() {
    return this.state.ids.map(id => this.state.entities[id]);
  }

  getProvider(id: number) {
    return this.state.entities[id];
  }
}
