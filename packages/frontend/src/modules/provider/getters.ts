import { Getters } from "vuex-smart-module";
import { ProviderState } from ".";

export class ProviderGetters extends Getters<ProviderState> {
  get providers() {
    return this.state.providers;
  }

  getProvider(id?: number) {
    return this.providers.find(item => item.id === id);
  }
}
