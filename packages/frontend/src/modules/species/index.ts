import { Module } from "vuex-smart-module";
import { SpeciesGetters } from "./getters";
import { SpeciesMutations } from "./mutations";
import { SpeciesActions } from "./actions";
import { SpeciesDto } from "@airlab/shared/lib/species/dto";
import { schema } from "normalizr";

export const speciesSchema = new schema.Entity("species");
export const speciesListSchema = [speciesSchema];

export class SpeciesState {
  ids: ReadonlyArray<number> = [];
  entities: { [key: number]: SpeciesDto } = {};
}

export const speciesModule = new Module({
  namespaced: true,

  state: SpeciesState,
  getters: SpeciesGetters,
  mutations: SpeciesMutations,
  actions: SpeciesActions,
});
