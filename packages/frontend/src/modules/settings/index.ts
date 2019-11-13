import { Module } from "vuex-smart-module";
import { SettingsActions } from "./actions";
import { SettingsGetters } from "./getters";
import { SettingsMutations } from "./mutations";

export class SettingsState {}

export const settingsModule = new Module({
  namespaced: true,

  state: SettingsState,
  getters: SettingsGetters,
  mutations: SettingsMutations,
  actions: SettingsActions,
});
