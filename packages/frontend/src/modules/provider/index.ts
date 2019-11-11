import { Module } from "vuex-smart-module";
import { ProviderGetters } from "./getters";
import { ProviderMutations } from "./mutations";
import { ProviderActions } from "./actions";
import { ProviderDto } from "@airlab/shared/lib/provider/dto";

export class ProviderState {
  providers: ProviderDto[] = [];
}

export const providerModule = new Module({
  namespaced: false,

  state: ProviderState,
  getters: ProviderGetters,
  mutations: ProviderMutations,
  actions: ProviderActions,
});
