import { mainModule } from "@/modules/main";
import { settingsModule } from "@/modules/settings";
import { userModule } from "@/modules/user";
import localforage from "localforage";
import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import { createStore, Module } from "vuex-smart-module";
import createLogger from "vuex/dist/logger";
import { groupModule } from "@/modules/group";
import { tagModule } from "@/modules/tag";
import { speciesModule } from "@/modules/species";
import { cloneModule } from "@/modules/clone";
import { proteinModule } from "@/modules/protein";
import { conjugateModule } from "@/modules/conjugate";
import { panelModule } from "@/modules/panel";
import { providerModule } from "@/modules/provider";
import { reagentModule } from "@/modules/reagent";
import { lotModule } from "@/modules/lot";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const rootModule = new Module({
  modules: {
    main: mainModule,
    user: userModule,
    group: groupModule,
    tag: tagModule,
    protein: proteinModule,
    reagent: reagentModule,
    clone: cloneModule,
    lot: lotModule,
    conjugate: conjugateModule,
    panel: panelModule,
    species: speciesModule,
    provider: providerModule,
    settings: settingsModule,
  },
});

const vuexStorage = new VuexPersistence<typeof rootModule>({
  strictMode: debug,
  storage: localforage,
  asyncStorage: true,
  modules: ["settings"],
});

export const store = createStore(rootModule, {
  strict: debug,
  plugins: debug ? [vuexStorage.plugin, createLogger()] : [vuexStorage.plugin],
  mutations: {
    RESTORE_MUTATION: vuexStorage.RESTORE_MUTATION, // this mutation **MUST** be named "RESTORE_MUTATION"
  },
});
export default store;
