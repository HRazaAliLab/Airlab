import { Module } from "vuex-smart-module";
import { CloneGetters } from "./getters";
import { CloneMutations } from "./mutations";
import { CloneActions } from "./actions";
import { CloneDto } from "@airlab/shared/lib/clone/dto";
import { schema } from "normalizr";

export const cloneSchema = new schema.Entity("clones");
export const cloneListSchema = [cloneSchema];

export class CloneState {
  ids: ReadonlyArray<number> = [];
  entities: { [key: number]: CloneDto } = {};
}

export const cloneModule = new Module({
  namespaced: true,

  state: CloneState,
  getters: CloneGetters,
  mutations: CloneMutations,
  actions: CloneActions,
});
