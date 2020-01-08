import { mainModule } from "@/modules/main";
import { Store } from "vuex";
import { Actions, Context } from "vuex-smart-module";
import { SpeciesState } from ".";
import { api } from "./api";
import { SpeciesGetters } from "./getters";
import { SpeciesMutations } from "./mutations";
import { CreateSpeciesDto, UpdateSpeciesDto } from "@airlab/shared/lib/species/dto";

export class SpeciesActions extends Actions<SpeciesState, SpeciesGetters, SpeciesMutations, SpeciesActions> {
  // Declare context type
  main?: Context<typeof mainModule>;

  // Called after the module is initialized
  $init(store: Store<any>): void {
    // Create and retain main module context
    this.main = mainModule.context(store);
  }

  async createSpecies(payload: CreateSpeciesDto) {
    try {
      const data = await api.createSpecies(payload);
      this.mutations.addEntity(data);
      this.main!.mutations.addNotification({ content: "Species successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getSpecies(id: number) {
    try {
      const data = await api.getSpecies(id);
      if (data) {
        this.mutations.setEntity(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateSpecies(payload: { id: number; data: UpdateSpeciesDto }) {
    try {
      const data = await api.updateSpecies(payload.id, payload.data);
      this.mutations.updateEntity(data);
      this.main!.mutations.addNotification({ content: "Species successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deleteSpecies(id: number) {
    try {
      const data = await api.deleteSpecies(id);
      this.mutations.deleteEntity(data);
      this.main!.mutations.addNotification({ content: "Species successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getGroupSpecies(groupId: number) {
    try {
      const data = await api.getGroupSpecies(groupId);
      if (data) {
        this.mutations.setEntities(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getSpeciesClones(speciesId: number) {
    try {
      return api.getSpeciesClones(speciesId);
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
