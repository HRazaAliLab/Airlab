import { mainModule } from "@/modules/main";
import { Store } from "vuex";
import { Actions, Context } from "vuex-smart-module";
import { LotState } from ".";
import { api } from "./api";
import { LotGetters } from "./getters";
import { LotMutations } from "./mutations";
import { CreateLotDto, UpdateLotDto } from "@airlab/shared/lib/lot/dto";

export class LotActions extends Actions<LotState, LotGetters, LotMutations, LotActions> {
  // Declare context type
  main?: Context<typeof mainModule>;

  // Called after the module is initialized
  $init(store: Store<any>): void {
    // Create and retain main module context
    this.main = mainModule.context(store);
  }

  async getLots() {
    try {
      const data = await api.getLots(this.main!.getters.token);
      if (data) {
        this.mutations.setLots(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async createLot(payload: CreateLotDto) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = await api.createLot(this.main!.getters.token, payload);
      this.mutations.setLot(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Lot successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getLot(id: number) {
    try {
      const data = await api.getLot(this.main!.getters.token, id);
      if (data) {
        this.mutations.setLot(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateLot(payload: { id: number; data: UpdateLotDto }) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = await api.updateLot(this.main!.getters.token, payload.id, payload.data);
      this.mutations.setLot(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Lot successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deleteLot(id: number) {
    try {
      const notification = { content: "deleting", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = await api.deleteLot(this.main!.getters.token, id);
      this.mutations.deleteLotById(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Lot successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getAllLotsForGroup() {
    try {
      const data = await api.getAllLotsForGroup(this.main!.getters.token);
      if (data) {
        this.mutations.setLots(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
