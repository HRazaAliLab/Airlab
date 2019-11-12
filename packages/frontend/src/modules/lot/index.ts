import { Module } from "vuex-smart-module";
import { LotGetters } from "./getters";
import { LotMutations } from "./mutations";
import { LotActions } from "./actions";
import { LotDto } from "@airlab/shared/lib/lot/dto";

export class LotState {
  lots: LotDto[] = [];
}

export const lotModule = new Module({
  namespaced: false,

  state: LotState,
  getters: LotGetters,
  mutations: LotMutations,
  actions: LotActions,
});
