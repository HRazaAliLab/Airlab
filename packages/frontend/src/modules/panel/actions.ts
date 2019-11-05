import { mainModule } from "@/modules/main";
import { Store } from "vuex";
import { Actions, Context } from "vuex-smart-module";
import { PanelState } from ".";
import { api } from "./api";
import { PanelGetters } from "./getters";
import { PanelMutations } from "./mutations";
import { CreatePanelDto, UpdatePanelDto } from "@airlab/shared/lib/panel/dto";

export class PanelActions extends Actions<PanelState, PanelGetters, PanelMutations, PanelActions> {
  // Declare context type
  main?: Context<typeof mainModule>;

  // Called after the module is initialized
  $init(store: Store<any>): void {
    // Create and retain main module context
    this.main = mainModule.context(store);
  }

  async getPanels() {
    try {
      const data = await api.getPanels(this.main!.getters.token);
      if (data) {
        this.mutations.setPanels(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async createPanel(payload: CreatePanelDto) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.createPanel(this.main!.getters.token, payload),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.setPanel(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Panel successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getPanel(id: number) {
    try {
      const data = await api.getPanel(this.main!.getters.token, id);
      if (data) {
        this.mutations.setPanel(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updatePanel(payload: { id: number; data: UpdatePanelDto }) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.updatePanel(this.main!.getters.token, payload.id, payload.data),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.setPanel(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Panel successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deletePanel(id: number) {
    try {
      const notification = { content: "deleting", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.deletePanel(this.main!.getters.token, id),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.deletePanelById(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Panel successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
