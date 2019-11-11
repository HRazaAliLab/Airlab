import { Mutations } from "vuex-smart-module";
import { ProviderState } from ".";
import { ProviderDto } from "@airlab/shared/lib/provider/dto";

export class ProviderMutations extends Mutations<ProviderState> {
  setProviders(payload: ProviderDto[]) {
    this.state.providers = payload;
  }

  setProvider(payload: ProviderDto) {
    const items = this.state.providers.filter(item => item.id !== payload.id);
    items.push(payload);
    this.state.providers = items;
  }

  deleteProvider(payload: ProviderDto) {
    const items = this.state.providers.filter(item => item.id !== payload.id);
    this.state.providers = items;
  }

  deleteProviderById(id: number) {
    const items = this.state.providers.filter(item => item.id !== id);
    this.state.providers = items;
  }

  reset() {
    this.state.providers = [];
  }
}
