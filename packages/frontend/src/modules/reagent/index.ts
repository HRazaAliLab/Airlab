import { Module } from "vuex-smart-module";
import { ReagentGetters } from "./getters";
import { ReagentMutations } from "./mutations";
import { ReagentActions } from "./actions";
import { ReagentDto } from "@airlab/shared/lib/reagent/dto";
import { schema } from "normalizr";

export const reagentSchema = new schema.Entity("reagents");
export const reagentListSchema = [reagentSchema];

export class ReagentState {
  ids: ReadonlyArray<number> = [];
  entities: { [key: number]: ReagentDto } = {};
}

export const reagentModule = new Module({
  namespaced: true,

  state: ReagentState,
  getters: ReagentGetters,
  mutations: ReagentMutations,
  actions: ReagentActions,
});
