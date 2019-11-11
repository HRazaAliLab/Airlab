import { mainModule } from "@/modules/main";
import { Store } from "vuex";
import { Actions, Context } from "vuex-smart-module";
import { ReagentState } from ".";
import { api } from "./api";
import { ReagentGetters } from "./getters";
import { ReagentMutations } from "./mutations";
import { CreateReagentDto, UpdateReagentDto } from "@airlab/shared/lib/reagent/dto";

export class ReagentActions extends Actions<ReagentState, ReagentGetters, ReagentMutations, ReagentActions> {
  // Declare context type
  main?: Context<typeof mainModule>;

  // Called after the module is initialized
  $init(store: Store<any>): void {
    // Create and retain main module context
    this.main = mainModule.context(store);
  }

  async getReagents() {
    try {
      const data = await api.getReagents(this.main!.getters.token);
      if (data) {
        this.mutations.setReagents(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async createReagent(payload: CreateReagentDto) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.createReagent(this.main!.getters.token, payload),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.setReagent(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Reagent successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getReagent(id: number) {
    try {
      const data = await api.getReagent(this.main!.getters.token, id);
      if (data) {
        this.mutations.setReagent(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateReagent(payload: { id: number; data: UpdateReagentDto }) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.updateReagent(this.main!.getters.token, payload.id, payload.data),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.setReagent(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Reagent successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deleteReagent(id: number) {
    try {
      const notification = { content: "deleting", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.deleteReagent(this.main!.getters.token, id),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.deleteReagentById(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Reagent successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getAllReagentsForGroup(groupId: number) {
    try {
      const data = await api.getAllReagentsForGroup(this.main!.getters.token, groupId);
      if (data) {
        this.mutations.setReagents(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
