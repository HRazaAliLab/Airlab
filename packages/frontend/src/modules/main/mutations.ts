import { Mutations } from "vuex-smart-module";
import { MainState } from ".";
import { AppNotification } from "./models";
import { ProfileDto } from "@airlab/shared/lib/user/dto";
import { ApiManager } from "@/utils/api";
import { MemberDto } from "@airlab/shared/lib/member/dto";

export class MainMutations extends Mutations<MainState> {
  setToken(payload: string) {
    this.state.token = payload;
    ApiManager.init(payload);
  }

  setLoggedIn(payload: boolean) {
    this.state.isLoggedIn = payload;
  }

  setLogInError(payload: boolean) {
    this.state.logInError = payload;
  }

  setUserProfile(payload: ProfileDto) {
    this.state.userProfile = payload;
  }

  setMyMember(payload: MemberDto) {
    this.state.myMember = payload;
  }

  setDashboardMiniDrawer(payload: boolean) {
    this.state.dashboardMiniDrawer = payload;
  }

  setDashboardShowDrawer(payload: boolean) {
    this.state.dashboardShowDrawer = payload;
  }

  addNotification(payload: AppNotification) {
    this.state.notifications.push(payload);
  }

  removeNotification(payload: AppNotification) {
    this.state.notifications = this.state.notifications.filter(notification => notification !== payload);
  }

  setProcessing(payload: boolean) {
    this.state.processing = payload;
  }

  setProcessingProgress(payload: number) {
    this.state.processingProgress = payload;
  }
}
