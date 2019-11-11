import { mainModule } from "@/modules/main";
import { Store } from "vuex";
import { Actions, Context } from "vuex-smart-module";
import { ProviderState } from ".";
import { api } from "./api";
import { ProviderGetters } from "./getters";
import { ProviderMutations } from "./mutations";
import { CreateProviderDto, UpdateProviderDto } from "@airlab/shared/lib/provider/dto";

export class ProviderActions extends Actions<ProviderState, ProviderGetters, ProviderMutations, ProviderActions> {
  // Declare context type
  main?: Context<typeof mainModule>;

  // Called after the module is initialized
  $init(store: Store<any>): void {
    // Create and retain main module context
    this.main = mainModule.context(store);
  }

  async getProviders() {
    try {
      const data = await api.getProviders(this.main!.getters.token);
      if (data) {
        this.mutations.setProviders(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async createProvider(payload: CreateProviderDto) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.createProvider(this.main!.getters.token, payload),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.setProvider(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Provider successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getProvider(id: number) {
    try {
      const data = await api.getProvider(this.main!.getters.token, id);
      if (data) {
        this.mutations.setProvider(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateProvider(payload: { id: number; data: UpdateProviderDto }) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.updateProvider(this.main!.getters.token, payload.id, payload.data),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.setProvider(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Provider successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deleteProvider(id: number) {
    try {
      const notification = { content: "deleting", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.deleteProvider(this.main!.getters.token, id),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.deleteProviderById(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Provider successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
