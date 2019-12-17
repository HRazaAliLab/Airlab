import { mainModule } from "@/modules/main";
import { Store } from "vuex";
import { Actions, Context } from "vuex-smart-module";
import { ProteinState } from ".";
import { api } from "./api";
import { ProteinGetters } from "./getters";
import { ProteinMutations } from "./mutations";
import { CreateProteinDto, UpdateProteinDto } from "@airlab/shared/lib/protein/dto";

export class ProteinActions extends Actions<ProteinState, ProteinGetters, ProteinMutations, ProteinActions> {
  // Declare context type
  main?: Context<typeof mainModule>;

  // Called after the module is initialized
  $init(store: Store<any>): void {
    // Create and retain main module context
    this.main = mainModule.context(store);
  }

  async createProtein(payload: CreateProteinDto) {
    try {
      const data = await api.createProtein(payload);
      this.mutations.addEntity(data);
      this.main!.mutations.addNotification({ content: "Protein successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getProtein(id: number) {
    try {
      const data = await api.getProtein(id);
      if (data) {
        this.mutations.setEntity(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateProtein(payload: { id: number; data: UpdateProteinDto }) {
    try {
      const data = await api.updateProtein(payload.id, payload.data);
      this.mutations.updateEntity(data);
      this.main!.mutations.addNotification({ content: "Protein successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deleteProtein(id: number) {
    try {
      const data = await api.deleteProtein(id);
      this.mutations.deleteEntity(data);
      this.main!.mutations.addNotification({ content: "Protein successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getGroupProteins(groupId: number) {
    try {
      const data = await api.getGroupProteins(groupId);
      if (data) {
        this.mutations.setEntities(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getProteinClones(proteinId: number) {
    try {
      return api.getProteinClones(proteinId);
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
