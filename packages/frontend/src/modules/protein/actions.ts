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

  async getProteins() {
    try {
      const data = await api.getProteins(this.main!.getters.token);
      if (data) {
        this.mutations.setProteins(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async createProtein(payload: CreateProteinDto) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.createProtein(this.main!.getters.token, payload),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.setProtein(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Protein successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getProtein(id: number) {
    try {
      const data = await api.getProtein(this.main!.getters.token, id);
      if (data) {
        this.mutations.setProtein(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateProtein(payload: { id: number; data: UpdateProteinDto }) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.updateProtein(this.main!.getters.token, payload.id, payload.data),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.setProtein(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Protein successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deleteProtein(id: number) {
    try {
      const notification = { content: "deleting", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.deleteProtein(this.main!.getters.token, id),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.deleteProteinById(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Protein successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getAllProteinsForGroup(groupId: number) {
    try {
      const data = await api.getAllProteinsForGroup(this.main!.getters.token, groupId);
      if (data) {
        this.mutations.setProteins(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
