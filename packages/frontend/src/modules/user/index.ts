import { UserActions } from "./actions";
import { UserMutations } from "./mutations";
import { Module } from "vuex-smart-module";
import { UserGetters } from "./getters";
import { UserDto } from "@airlab/shared/lib/user/dto";

export class UserState {
  users: UserDto[] = [];
}

export const userModule = new Module({
  namespaced: false,

  state: UserState,
  getters: UserGetters,
  mutations: UserMutations,
  actions: UserActions,
});
