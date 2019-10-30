import { mainModule } from "@/modules/main";
import { Store } from "vuex";
import { Actions, Context } from "vuex-smart-module";
import { TagState } from ".";
import { api } from "./api";
import { TagGetters } from "./getters";
import { TagMutations } from "./mutations";
import { CreateTagDto, UpdateTagDto } from "@airlab/shared/lib/tag/dto";

export class TagActions extends Actions<TagState, TagGetters, TagMutations, TagActions> {
  // Declare context type
  main?: Context<typeof mainModule>;

  // Called after the module is initialized
  $init(store: Store<any>): void {
    // Create and retain main module context
    this.main = mainModule.context(store);
  }

  async getTags() {
    try {
      const data = await api.getTags(this.main!.getters.token);
      if (data) {
        this.mutations.setTags(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async createTag(payload: CreateTagDto) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.createTag(this.main!.getters.token, payload),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.setTag(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Tag successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getTag(id: number) {
    try {
      const data = await api.getTag(this.main!.getters.token, id);
      if (data) {
        this.mutations.setTag(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateTag(payload: { id: number; data: UpdateTagDto }) {
    try {
      const notification = { content: "saving", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.updateTag(this.main!.getters.token, payload.id, payload.data),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.setTag(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Tag successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deleteTag(id: number) {
    try {
      const notification = { content: "deleting", showProgress: true };
      this.main!.mutations.addNotification(notification);
      const data = (await Promise.all([
        api.deleteTag(this.main!.getters.token, id),
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      this.mutations.deleteTag(data);
      this.main!.mutations.removeNotification(notification);
      this.main!.mutations.addNotification({ content: "Tag successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
