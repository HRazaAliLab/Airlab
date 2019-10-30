import { Module } from "vuex-smart-module";
import { GroupGetters } from "./getters";
import { GroupDto } from "@airlab/shared/lib/group/dto";
import { GroupMutations } from "./mutations";
import { GroupActions } from "./actions";

export class GroupState {
  groups: GroupDto[] = [];
  activeGroupId?: number = undefined;
}

export const groupModule = new Module({
  namespaced: false,

  state: GroupState,
  getters: GroupGetters,
  mutations: GroupMutations,
  actions: GroupActions,
});
