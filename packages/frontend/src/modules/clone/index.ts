import { Module } from "vuex-smart-module";
import { CloneGetters } from "./getters";
import { CloneMutations } from "./mutations";
import { CloneActions } from "./actions";
import { CloneDto } from "@airlab/shared/lib/clone/dto";

export class CloneState {
  clones: CloneDto[] = [];
}

export const cloneModule = new Module({
  namespaced: false,

  state: CloneState,
  getters: CloneGetters,
  mutations: CloneMutations,
  actions: CloneActions,
});
