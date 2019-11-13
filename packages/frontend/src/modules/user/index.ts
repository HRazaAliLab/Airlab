import { UserActions } from "./actions";
import { UserMutations } from "./mutations";
import { Module } from "vuex-smart-module";
import { UserGetters } from "./getters";
import { UserDto } from "@airlab/shared/lib/user/dto";
import { schema } from "normalizr";

export const userSchema = new schema.Entity("users");
export const userListSchema = [userSchema];

export class UserState {
  ids: ReadonlyArray<number> = [];
  entities: { [key: number]: UserDto } = {};
}

export const userModule = new Module({
  namespaced: true,

  state: UserState,
  getters: UserGetters,
  mutations: UserMutations,
  actions: UserActions,
});
