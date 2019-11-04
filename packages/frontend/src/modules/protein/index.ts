import { Module } from "vuex-smart-module";
import { ProteinGetters } from "./getters";
import { ProteinMutations } from "./mutations";
import { ProteinActions } from "./actions";
import { ProteinDto } from "@airlab/shared/lib/protein/dto";

export class ProteinState {
  proteins: ProteinDto[] = [];
}

export const proteinModule = new Module({
  namespaced: false,

  state: ProteinState,
  getters: ProteinGetters,
  mutations: ProteinMutations,
  actions: ProteinActions,
});
