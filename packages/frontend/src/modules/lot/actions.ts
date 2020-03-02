import { mainModule } from "@/modules/main";
import { Store } from "vuex";
import { Actions, Context } from "vuex-smart-module";
import { LotState } from ".";
import { api } from "./api";
import { LotGetters } from "./getters";
import { LotMutations } from "./mutations";
import { CreateLotDto, UpdateLotDto } from "@airlab/shared/lib/lot/dto";
import { UpdateArchiveStateDto } from "@airlab/shared/lib/core/dto";

export class LotActions extends Actions<LotState, LotGetters, LotMutations, LotActions> {
  // Declare context type
  main?: Context<typeof mainModule>;

  // Called after the module is initialized
  $init(store: Store<any>): void {
    // Create and retain main module context
    this.main = mainModule.context(store);
  }

  async createLot(payload: CreateLotDto) {
    try {
      const data = await api.createLot(payload);
      this.mutations.addEntity(data);
      this.main!.mutations.addNotification({ content: "Lot successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getLot(id: number) {
    try {
      const data = await api.getLot(id);
      if (data) {
        this.mutations.setEntity(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateLot(payload: { id: number; data: UpdateLotDto }) {
    try {
      const data = await api.updateLot(payload.id, payload.data);
      this.mutations.updateEntity(data);
      this.main!.mutations.addNotification({ content: "Lot successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateLotArchiveState(payload: { id: number; data: UpdateArchiveStateDto }) {
    try {
      const data = await api.updateLotArchiveState(payload.id, payload.data);
      this.mutations.updateEntity(data);
      this.main!.mutations.addNotification({
        content: `Lot successfully ${payload.data.isArchived ? "archived" : "unarchived"}`,
        color: "success",
      });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deleteLot(id: number) {
    try {
      const data = await api.deleteLot(id);
      this.mutations.deleteEntity(data);
      this.main!.mutations.addNotification({ content: "Lot successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getGroupLots(groupId: number) {
    try {
      const data = await api.getGroupLots(groupId);
      if (data) {
        this.mutations.setEntities(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getLotConjugates(lotId: number) {
    try {
      return api.getLotConjugates(lotId);
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
