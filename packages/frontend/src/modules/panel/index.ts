import { Module } from "vuex-smart-module";
import { PanelGetters } from "./getters";
import { PanelMutations } from "./mutations";
import { PanelActions } from "./actions";
import { PanelDto } from "@airlab/shared/lib/panel/dto";

export class PanelState {
  panels: PanelDto[] = [];
}

export const panelModule = new Module({
  namespaced: false,

  state: PanelState,
  getters: PanelGetters,
  mutations: PanelMutations,
  actions: PanelActions,
});
