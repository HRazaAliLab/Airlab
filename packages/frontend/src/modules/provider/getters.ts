import { Getters } from "vuex-smart-module";
import { ProviderState } from ".";

export class ProviderGetters extends Getters<ProviderState> {
  get providers() {
    return Object.values(this.state.entities).sort((a, b) => a.name.localeCompare(b.name));
  }

  getProvider(id: number) {
    return this.state.entities[id];
  }
}
