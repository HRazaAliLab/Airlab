import { mainModule } from "@/modules/main";
import { Store } from "vuex";
import { Actions, Context } from "vuex-smart-module";
import { ConjugateState } from ".";
import { api } from "./api";
import { ConjugateGetters } from "./getters";
import { ConjugateMutations } from "./mutations";
import { CreateConjugateDto, UpdateConjugateDto, UpdateConjugateStatusDto } from "@airlab/shared/lib/conjugate/dto";
import { UpdateStateDto } from "@airlab/shared/lib/core/dto";
import { ConjugateStatus } from "@airlab/shared/lib/conjugate/ConjugateStatus";

export class ConjugateActions extends Actions<ConjugateState, ConjugateGetters, ConjugateMutations, ConjugateActions> {
  // Declare context type
  main?: Context<typeof mainModule>;

  // Called after the module is initialized
  $init(store: Store<any>): void {
    // Create and retain main module context
    this.main = mainModule.context(store);
  }

  async createConjugate(payload: CreateConjugateDto) {
    try {
      const data = await api.createConjugate(payload);
      this.mutations.addEntity(data);
      this.main!.mutations.addNotification({ content: "Conjugate successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getConjugate(id: number) {
    try {
      const data = await api.getConjugate(id);
      if (data) {
        this.mutations.setEntity(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateConjugate(payload: { id: number; data: UpdateConjugateDto }) {
    try {
      const data = await api.updateConjugate(payload.id, payload.data);
      this.mutations.updateEntity(data);
      this.main!.mutations.addNotification({ content: "Conjugate successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateConjugateArchiveState(payload: { id: number; data: UpdateStateDto }) {
    try {
      const data = await api.updateConjugateArchiveState(payload.id, payload.data);
      this.mutations.updateEntity(data);
      this.main!.mutations.addNotification({
        content: `Conjugate successfully ${payload.data.state ? "archived" : "unarchived"}`,
        color: "success",
      });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateConjugateStatus(payload: { id: number; data: UpdateConjugateStatusDto }) {
    try {
      const data = await api.updateConjugateStatus(payload.id, payload.data);
      this.mutations.updateEntity(data);
      this.main!.mutations.addNotification({
        content: `Conjugate successfully changed its status to ${ConjugateStatus[payload.data.status]}`,
        color: "success",
      });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deleteConjugate(id: number) {
    try {
      const data = await api.deleteConjugate(id);
      this.mutations.deleteEntity(data);
      this.main!.mutations.addNotification({ content: "Conjugate successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getGroupConjugates(groupId: number) {
    try {
      const data = await api.getGroupConjugates(groupId);
      if (data) {
        this.mutations.setEntities(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getConjugatePanels(id: number) {
    try {
      return api.getConjugatePanels(id);
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
