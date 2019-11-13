import { Module } from "vuex-smart-module";
import { ProviderGetters } from "./getters";
import { ProviderMutations } from "./mutations";
import { ProviderActions } from "./actions";
import { ProviderDto } from "@airlab/shared/lib/provider/dto";
import { schema } from "normalizr";

export const providerSchema = new schema.Entity("providers");
export const providerListSchema = [providerSchema];

export class ProviderState {
  ids: ReadonlyArray<number> = [];
  entities: { [key: number]: ProviderDto } = {};
}

export const providerModule = new Module({
  namespaced: true,

  state: ProviderState,
  getters: ProviderGetters,
  mutations: ProviderMutations,
  actions: ProviderActions,
});
