import { Module } from "vuex-smart-module";
import { ConjugateGetters } from "./getters";
import { ConjugateMutations } from "./mutations";
import { ConjugateActions } from "./actions";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";

export class ConjugateState {
  conjugates: ConjugateDto[] = [];
}

export const conjugateModule = new Module({
  namespaced: false,

  state: ConjugateState,
  getters: ConjugateGetters,
  mutations: ConjugateMutations,
  actions: ConjugateActions,
});
