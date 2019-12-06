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

  async createTag(payload: CreateTagDto) {
    try {
      const data = await api.createTag(payload);
      this.mutations.addEntity(data);
      this.main!.mutations.addNotification({ content: "Tag successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getTag(id: number) {
    try {
      const data = await api.getTag(id);
      if (data) {
        this.mutations.setEntity(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateTag(payload: { id: number; data: UpdateTagDto }) {
    try {
      const data = await api.updateTag(payload.id, payload.data);
      this.mutations.updateEntity(data);
      this.main!.mutations.addNotification({ content: "Tag successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deleteTag(id: number) {
    try {
      const data = await api.deleteTag(id);
      this.mutations.deleteEntity(data);
      this.main!.mutations.addNotification({ content: "Tag successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getGroupTags(groupId: number) {
    try {
      const data = await api.getGroupTags(groupId);
      if (data) {
        this.mutations.setEntities(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
