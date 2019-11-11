import { Module } from "vuex-smart-module";
import { MainActions } from "./actions";
import { MainGetters } from "./getters";
import { AppNotification } from "./models";
import { MainMutations } from "./mutations";
import { ProfileDto } from "@airlab/shared/lib/user/dto";

export class MainState {
  token = "";
  isLoggedIn: boolean | null = null;
  logInError = false;
  userProfile: ProfileDto | null = null;
  dashboardMiniDrawer = false;
  dashboardShowDrawer = true;
  notifications: AppNotification[] = [];

  processing = false;
  processingProgress = 0;
}

export const mainModule = new Module({
  namespaced: false,

  state: MainState,
  getters: MainGetters,
  mutations: MainMutations,
  actions: MainActions,
});
