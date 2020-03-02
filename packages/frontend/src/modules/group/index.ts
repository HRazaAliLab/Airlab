import { Module } from "vuex-smart-module";
import { GroupGetters } from "./getters";
import { GroupDto } from "@airlab/shared/lib/group/dto";
import { GroupMutations } from "./mutations";
import { GroupActions } from "./actions";
import { schema } from "normalizr";
import { MemberDto } from "@airlab/shared/lib/member/dto";

export const groupSchema = new schema.Entity("groups");
export const groupListSchema = [groupSchema];

export class GroupState {
  ids: ReadonlyArray<number> = [];
  entities: { [key: number]: GroupDto } = {};
  activeGroupId?: number = undefined;
  myMember: MemberDto | null = null;
}

export const groupModule = new Module({
  namespaced: true,

  state: GroupState,
  getters: GroupGetters,
  mutations: GroupMutations,
  actions: GroupActions,
});
