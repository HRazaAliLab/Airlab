import { Module } from "vuex-smart-module";
import { MainActions } from "./actions";
import { MainGetters } from "./getters";
import { AppNotification } from "./models";
import { MainMutations } from "./mutations";
import { ProfileDto } from "@airlab/shared/lib/user/dto";
import { MemberDto } from "@airlab/shared/lib/member/dto";

export class MainState {
  token = "";
  isLoggedIn: boolean | null = null;
  logInError = false;
  userProfile: ProfileDto | null = null;
  myMember: MemberDto | null = null;
  dashboardMiniDrawer = false;
  dashboardShowDrawer = true;
  notifications: AppNotification[] = [];

  processing = false;
  processingProgress = 0;
}

export const mainModule = new Module({
  namespaced: true,

  state: MainState,
  getters: MainGetters,
  mutations: MainMutations,
  actions: MainActions,
});
