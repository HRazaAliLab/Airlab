import { Module } from "vuex-smart-module";
import { LotGetters } from "./getters";
import { LotMutations } from "./mutations";
import { LotActions } from "./actions";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import { schema } from "normalizr";

export const lotSchema = new schema.Entity("lots");
export const lotListSchema = [lotSchema];

export class LotState {
  ids: ReadonlyArray<number> = [];
  entities: { [key: number]: LotDto } = {};
}

export const lotModule = new Module({
  namespaced: true,

  state: LotState,
  getters: LotGetters,
  mutations: LotMutations,
  actions: LotActions,
});
