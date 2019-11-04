import { mainModule } from "@/modules/main";
import { Store } from "vuex";
import { Actions, Context } from "vuex-smart-module";
import { CloneState } from ".";
import { api } from "./api";
import { CloneGetters } from "./getters";
import { CloneMutations } from "./mutations";
import { CreateCloneDto, UpdateCloneDto } from "@airlab/shared/lib/clone/dto";

export class CloneActions extends Actions<CloneState, CloneGetters, CloneMutations, CloneActions> {
  // Declare context type
  main?: Context<typeof mainModule>;

  // Called after the module is initialized
  $init(store: Store<any>): void {
    // Create and retain main module context
    this.main = mainModule.context(store);
  }

  async getClones() {
    try {
      const data = await api.getClones(this.main!.getters.token);
      if (data) {
        this.mutations.setClones(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async createClone(payload: CreateCloneDto) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.createClone(this.main!.getters.token, payload),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.setClone(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Clone successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getClone(id: number) {
    try {
      const data = await api.getClone(this.main!.getters.token, id);
      if (data) {
        this.mutations.setClone(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateClone(payload: { id: number; data: UpdateCloneDto }) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.updateClone(this.main!.getters.token, payload.id, payload.data),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.setClone(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Clone successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deleteClone(id: number) {
    try {
      const notification = { content: "deleting", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.deleteClone(this.main!.getters.token, id),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.deleteCloneById(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Clone successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getAllClonesForUser() {
    try {
      const data = await api.getAllClonesForUser(this.main!.getters.token);
      if (data) {
        this.mutations.setClones(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
