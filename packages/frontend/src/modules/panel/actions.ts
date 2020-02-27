import { mainModule } from "@/modules/main";
import { Store } from "vuex";
import { Actions, Context } from "vuex-smart-module";
import { PanelState } from ".";
import { api } from "./api";
import { PanelGetters } from "./getters";
import { PanelMutations } from "./mutations";
import { CreatePanelDto, DuplicatePanelDto, UpdatePanelDto } from "@airlab/shared/lib/panel/dto";

export class PanelActions extends Actions<PanelState, PanelGetters, PanelMutations, PanelActions> {
  // Declare context type
  main?: Context<typeof mainModule>;

  // Called after the module is initialized
  $init(store: Store<any>): void {
    // Create and retain main module context
    this.main = mainModule.context(store);
  }

  async createPanel(payload: CreatePanelDto) {
    try {
      const data = await api.createPanel(payload);
      this.mutations.addEntity(data);
      this.main!.mutations.addNotification({ content: "Panel successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async duplicatePanel(payload: { id: number; data: DuplicatePanelDto }) {
    try {
      const data = await api.duplicatePanel(payload.id, payload.data);
      this.mutations.addEntity(data);
      this.main!.mutations.addNotification({ content: "Panel successfully duplicated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getPanel(id: number) {
    try {
      const data = await api.getPanel(id);
      if (data) {
        this.mutations.setEntity(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updatePanel(payload: { id: number; data: UpdatePanelDto }) {
    try {
      const data = await api.updatePanel(payload.id, payload.data);
      this.mutations.updateEntity(data);
      this.main!.mutations.addNotification({ content: "Panel successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deletePanel(id: number) {
    try {
      const data = await api.deletePanel(id);
      this.mutations.deleteEntity(data);
      this.main!.mutations.addNotification({ content: "Panel successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getGroupPanels(groupId: number) {
    try {
      const data = await api.getGroupPanels(groupId);
      if (data) {
        this.mutations.setEntities(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getPanelElements(panelId: number) {
    try {
      return api.getPanelElements(panelId);
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
