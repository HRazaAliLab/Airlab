import { Module } from "vuex-smart-module";
import { ConjugateGetters } from "./getters";
import { ConjugateMutations } from "./mutations";
import { ConjugateActions } from "./actions";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { schema } from "normalizr";

export const conjugateSchema = new schema.Entity("conjugates");
export const conjugateListSchema = [conjugateSchema];

export class ConjugateState {
  ids: ReadonlyArray<number> = [];
  entities: { [key: number]: ConjugateDto } = {};
}

export const conjugateModule = new Module({
  namespaced: true,

  state: ConjugateState,
  getters: ConjugateGetters,
  mutations: ConjugateMutations,
  actions: ConjugateActions,
});
