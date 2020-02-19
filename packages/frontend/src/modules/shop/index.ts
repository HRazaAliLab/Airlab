import { Module } from "vuex-smart-module";
import { ShopGetters } from "./getters";
import { ShopMutations } from "./mutations";
import { ShopActions } from "./actions";

export class ShopState {
  ids: ReadonlyArray<number> = [];
}

export const shopModule = new Module({
  namespaced: true,

  state: ShopState,
  getters: ShopGetters,
  mutations: ShopMutations,
  actions: ShopActions,
});
