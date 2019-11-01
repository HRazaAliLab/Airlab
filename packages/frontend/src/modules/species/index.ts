import { Module } from "vuex-smart-module";
import { SpeciesGetters } from "./getters";
import { SpeciesMutations } from "./mutations";
import { SpeciesActions } from "./actions";
import { SpeciesDto } from "@airlab/shared/lib/species/dto";

export class SpeciesState {
  species: SpeciesDto[] = [];
}

export const speciesModule = new Module({
  namespaced: false,

  state: SpeciesState,
  getters: SpeciesGetters,
  mutations: SpeciesMutations,
  actions: SpeciesActions,
});
