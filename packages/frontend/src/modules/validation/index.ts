import { Module } from "vuex-smart-module";
import { ValidationGetters } from "./getters";
import { ValidationMutations } from "./mutations";
import { ValidationActions } from "./actions";
import { schema } from "normalizr";
import { ValidationDto } from "@airlab/shared/lib/validation/dto";

export const validationSchema = new schema.Entity("validations");
export const validationListSchema = [validationSchema];

export class ValidationState {
  ids: ReadonlyArray<number> = [];
  entities: { [key: number]: ValidationDto } = {};
}

export const validationModule = new Module({
  namespaced: true,

  state: ValidationState,
  getters: ValidationGetters,
  mutations: ValidationMutations,
  actions: ValidationActions,
});
