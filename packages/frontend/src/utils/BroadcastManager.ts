import { mainModule, MainState } from "@/modules/main";
import { MainActions } from "@/modules/main/actions";
import { MainGetters } from "@/modules/main/getters";
import { MainMutations } from "@/modules/main/mutations";
import { settingsModule, SettingsState } from "@/modules/settings";
import { SettingsActions } from "@/modules/settings/actions";
import { SettingsGetters } from "@/modules/settings/getters";
import { SettingsMutations } from "@/modules/settings/mutations";
import { Store } from "vuex";
import { Context, Module } from "vuex-smart-module";
import { groupModule, GroupState } from "@/modules/group";
import { GroupGetters } from "@/modules/group/getters";
import { GroupMutations } from "@/modules/group/mutations";
import { GroupActions } from "@/modules/group/actions";

export class BroadcastManager {
  static mainContext: Context<Module<MainState, MainGetters, MainMutations, MainActions>>;
  static groupContext: Context<Module<GroupState, GroupGetters, GroupMutations, GroupActions>>;
  static settingsContext: Context<Module<SettingsState, SettingsGetters, SettingsMutations, SettingsActions>>;
  static channel: BroadcastChannel;

  static init(store: Store<any>) {
    BroadcastManager.close();
    BroadcastManager.mainContext = mainModule.context(store);
    BroadcastManager.groupContext = groupModule.context(store);
    BroadcastManager.settingsContext = settingsModule.context(store);

    BroadcastManager.channel = new BroadcastChannel("AirLab");
    BroadcastManager.channel.onmessage = (ev) => {
      const method = ev.data.method;
      const payload = ev.data.payload;
      payload.suppressBroadcast = true; // Suppress broadcasting
      this.settingsContext.mutations[method](payload);
    };
    BroadcastManager.channel.onmessageerror = (ev) => {
      console.log(ev);
    };
  }

  static close() {
    if (BroadcastManager.channel) {
      BroadcastManager.channel.close();
    }
  }

  static postMessage(message) {
    if (BroadcastManager.channel) {
      BroadcastManager.channel.postMessage(message);
    }
  }
}
