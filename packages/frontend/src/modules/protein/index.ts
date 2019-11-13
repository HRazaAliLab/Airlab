import { Module } from "vuex-smart-module";
import { ProteinGetters } from "./getters";
import { ProteinMutations } from "./mutations";
import { ProteinActions } from "./actions";
import { ProteinDto } from "@airlab/shared/lib/protein/dto";
import { schema } from "normalizr";

export const proteinSchema = new schema.Entity("proteins");
export const proteinListSchema = [proteinSchema];

export class ProteinState {
  ids: ReadonlyArray<number> = [];
  entities: { [key: number]: ProteinDto } = {};
}

export const proteinModule = new Module({
  namespaced: true,

  state: ProteinState,
  getters: ProteinGetters,
  mutations: ProteinMutations,
  actions: ProteinActions,
});
