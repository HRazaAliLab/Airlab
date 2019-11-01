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

  async getSpecies() {
    try {
      const data = await api.getSpecies(this.main!.getters.token);
      if (data) {
        this.mutations.setSpecies(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async createSpecies(payload: CreateSpeciesDto) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.createSpecies(this.main!.getters.token, payload),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.setOneSpecies(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Species successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getOneSpecies(id: number) {
    try {
      const data = await api.getOneSpecies(this.main!.getters.token, id);
      if (data) {
        this.mutations.setOneSpecies(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateSpecies(payload: { id: number; data: UpdateSpeciesDto }) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.updateSpecies(this.main!.getters.token, payload.id, payload.data),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.setOneSpecies(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Species successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deleteSpecies(id: number) {
    try {
      const notification = { content: "deleting", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.deleteSpecies(this.main!.getters.token, id),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.deleteSpecies(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Species successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
