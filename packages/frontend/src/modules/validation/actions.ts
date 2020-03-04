import { mainModule } from "@/modules/main";
import { Store } from "vuex";
import { Actions, Context } from "vuex-smart-module";
import { ValidationState } from ".";
import { api } from "./api";
import { ValidationGetters } from "./getters";
import { ValidationMutations } from "./mutations";
import { CreateValidationDto, UpdateValidationDto } from "@airlab/shared/lib/validation/dto";
import { UpdateStateDto } from "@airlab/shared/lib/core/dto";

export class ValidationActions extends Actions<
  ValidationState,
  ValidationGetters,
  ValidationMutations,
  ValidationActions
> {
  // Declare context type
  main?: Context<typeof mainModule>;

  // Called after the module is initialized
  $init(store: Store<any>): void {
    // Create and retain main module context
    this.main = mainModule.context(store);
  }

  async createValidation(payload: CreateValidationDto) {
    try {
      const data = await api.createValidation(payload);
      this.mutations.addEntity(data);
      this.main!.mutations.addNotification({ content: "Validation successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getValidation(id: number) {
    try {
      const data = await api.getValidation(id);
      if (data) {
        this.mutations.setEntity(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateValidation(payload: { id: number; data: UpdateValidationDto }) {
    try {
      const data = await api.updateValidation(payload.id, payload.data);
      this.mutations.updateEntity(data);
      this.main!.mutations.addNotification({ content: "Validation successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateValidationArchiveState(payload: { id: number; data: UpdateStateDto }) {
    try {
      const data = await api.updateValidationArchiveState(payload.id, payload.data);
      this.mutations.updateEntity(data);
      this.main!.mutations.addNotification({
        content: `Validation successfully ${payload.data.state ? "archived" : "unarchived"}`,
        color: "success",
      });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deleteValidation(id: number) {
    try {
      const data = await api.deleteValidation(id);
      this.mutations.deleteEntity(data);
      this.main!.mutations.addNotification({ content: "Validation successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getGroupValidations(groupId: number) {
    try {
      const data = await api.getGroupValidations(groupId);
      if (data) {
        this.mutations.setEntities(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async uploadValidationFile(payload: { validationId: number; formData: FormData }) {
    try {
      // await api.uploadValidationFile(
      //   this.main!.getters.token,
      //   payload.validationId,
      //   payload.formData,
      //   () => {
      //     console.log("Upload has started.");
      //     this.main!.mutations.setProcessing(true);
      //   },
      //   () => {
      //     console.log("Upload completed successfully.");
      //     this.main!.mutations.setProcessing(false);
      //     this.main!.mutations.setProcessingProgress(0);
      //     this.main!.mutations.addNotification({ content: "File successfully uploaded", color: "success" });
      //   },
      //   event => {
      //     const percent = Math.round((100 * event.loaded) / event.total);
      //     this.main!.mutations.setProcessingProgress(percent);
      //   },
      //   () => {}
      // );

      const data = await api.uploadValidationFile(payload.validationId, payload.formData);
      this.main!.mutations.addNotification({ content: "Validation file successfully uploaded", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async deleteValidationFile(fileId: number) {
    try {
      const data = await api.deleteValidationFile(fileId);
      this.main!.mutations.addNotification({ content: "Validation file successfully deleted", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
