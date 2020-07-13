import { mainModule } from "@/modules/main";
import { Store } from "vuex";
import { Actions, Context } from "vuex-smart-module";
import { LotState } from ".";
import { api } from "./api";
import { LotGetters } from "./getters";
import { LotMutations } from "./mutations";
import { CreateLotDto, UpdateLotDto, UpdateLotStatusDto } from "@airlab/shared/lib/lot/dto";
import { UpdateStateDto } from "@airlab/shared/lib/core/dto";
import { ConjugateStatus } from "@airlab/shared/lib/conjugate/ConjugateStatus";
import { RequestQuery } from "@/utils/QueryBuilder";

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

  async updateLotArchiveState(payload: { id: number; data: UpdateStateDto }) {
    try {
      const data = await api.updateLotArchiveState(payload.id, payload.data);
      this.mutations.updateEntity(data);
      this.main!.mutations.addNotification({
        content: `Lot successfully ${payload.data.state ? "archived" : "unarchived"}`,
        color: "success",
      });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateLotStatus(payload: { id: number; data: UpdateLotStatusDto }) {
    try {
      const data = await api.updateLotStatus(payload.id, payload.data);
      this.mutations.updateEntity(data);
      this.main!.mutations.addNotification({
        content: `Lot successfully changed its status to ${ConjugateStatus[payload.data.status]}`,
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

  async getGroupLots(payload: { groupId: number; query?: RequestQuery }) {
    try {
      const data = await api.getGroupLots(payload.groupId, payload.query);
      if (data) {
        this.mutations.setEntities(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getRecentOrders(groupId: number) {
    try {
      return await api.getGroupLots(groupId, { limit: 10, status: 0 });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getFinishedLots(groupId: number) {
    try {
      return await api.getGroupLots(groupId, { limit: 10, status: 6 });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getLowLots(groupId: number) {
    try {
      return await api.getGroupLots(groupId, { limit: 10, status: 5 });
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
