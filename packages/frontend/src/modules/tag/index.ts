import { Module } from "vuex-smart-module";
import { TagGetters } from "./getters";
import { TagMutations } from "./mutations";
import { TagActions } from "./actions";
import { TagDto } from "@airlab/shared/lib/tag/dto";
import { schema } from "normalizr";

export const tagSchema = new schema.Entity("tags");
export const tagListSchema = [tagSchema];

export class TagState {
  ids: ReadonlyArray<number> = [];
  entities: { [key: number]: TagDto } = {};
}

export const tagModule = new Module({
  namespaced: true,

  state: TagState,
  getters: TagGetters,
  mutations: TagMutations,
  actions: TagActions,
});
