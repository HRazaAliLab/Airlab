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

  async createProvider(payload: CreateProviderDto) {
    try {
      const data = await api.createProvider(payload);
      this.mutations.addEntity(data);
      this.main!.mutations.addNotification({ content: "Provider successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getProvider(id: number) {
    try {
      const data = await api.getProvider(id);
      if (data) {
        this.mutations.setEntity(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateProvider(payload: { id: number; data: UpdateProviderDto }) {
    try {
      const data = await api.updateProvider(payload.id, payload.data);
      this.mutations.updateEntity(data);
      this.main!.mutations.addNotification({ content: "Provider successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deleteProvider(id: number) {
    try {
      const data = await api.deleteProvider(id);
      this.mutations.deleteEntity(data);
      this.main!.mutations.addNotification({ content: "Provider successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getGroupProviders(groupId: number) {
    try {
      const data = await api.getGroupProviders(groupId);
      if (data) {
        this.mutations.setEntities(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
