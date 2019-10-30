import { mainModule } from "@/modules/main";
import { Store } from "vuex";
import { Actions, Context } from "vuex-smart-module";
import { GroupState } from ".";
import { api } from "./api";
import { GroupGetters } from "./getters";
import { GroupMutations } from "./mutations";
import { CreateGroupDto, UpdateGroupDto } from "@airlab/shared/lib/group/dto";

export class GroupActions extends Actions<GroupState, GroupGetters, GroupMutations, GroupActions> {
  // Declare context type
  main?: Context<typeof mainModule>;

  // Called after the module is initialized
  $init(store: Store<any>): void {
    // Create and retain main module context
    this.main = mainModule.context(store);
  }

  async getGroups() {
    try {
      const data = await api.getGroups(this.main!.getters.token);
      if (data) {
        this.mutations.setGroups(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async createGroup(payload: CreateGroupDto) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.createGroup(this.main!.getters.token, payload),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.setGroup(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Group successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getGroup(id: number) {
    try {
      const data = await api.getGroup(this.main!.getters.token, id);
      if (data) {
        this.mutations.setGroup(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateGroup(payload: { id: number; data: UpdateGroupDto }) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.updateGroup(this.main!.getters.token, payload.id, payload.data),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.setGroup(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Group successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deleteGroup(id: number) {
    try {
      const notification = { content: "deleting", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.deleteGroup(this.main!.getters.token, id),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.deleteGroup(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Group successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
