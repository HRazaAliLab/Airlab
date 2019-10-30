import { Module } from "vuex-smart-module";
import { TagGetters } from "./getters";
import { TagMutations } from "./mutations";
import { TagActions } from "./actions";
import { TagDto } from "@airlab/shared/lib/tag/dto";

export class TagState {
  tags: TagDto[] = [];
}

export const tagModule = new Module({
  namespaced: false,

  state: TagState,
  getters: TagGetters,
  mutations: TagMutations,
  actions: TagActions,
});
