import { Mutations } from "vuex-smart-module";
import { SettingsState } from ".";

export class SettingsMutations extends Mutations<SettingsState> {
  resetSettings(payload: { suppressBroadcast?: boolean }) {}
}
