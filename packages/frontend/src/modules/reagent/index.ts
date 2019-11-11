import { Module } from "vuex-smart-module";
import { ReagentGetters } from "./getters";
import { ReagentMutations } from "./mutations";
import { ReagentActions } from "./actions";
import { ReagentDto } from "@airlab/shared/lib/reagent/dto";

export class ReagentState {
  reagents: ReagentDto[] = [];
}

export const reagentModule = new Module({
  namespaced: false,

  state: ReagentState,
  getters: ReagentGetters,
  mutations: ReagentMutations,
  actions: ReagentActions,
});
