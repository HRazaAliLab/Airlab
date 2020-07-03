import { Module } from "vuex-smart-module";
import { PanelGetters } from "./getters";
import { PanelMutations } from "./mutations";
import { PanelActions } from "./actions";
import { PanelDto } from "@airlab/shared/lib/panel/dto";
import { schema } from "normalizr";
import { TagDto } from "@airlab/shared/lib/tag/dto";

export const panelSchema = new schema.Entity("panels");
export const panelListSchema = [panelSchema];

export class PanelState {
  ids: ReadonlyArray<number> = [];
  entities: { [key: number]: PanelDto } = {};
  activePanelTag: TagDto | null = null;
}

export const panelModule = new Module({
  namespaced: true,

  state: PanelState,
  getters: PanelGetters,
  mutations: PanelMutations,
  actions: PanelActions,
});
