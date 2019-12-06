import { ApiManager } from "@/utils/api";
import { CreateValidationDto, UpdateValidationDto, ValidationDto } from "@airlab/shared/lib/validation/dto";

export const api = {
  async createValidation(data: CreateValidationDto) {
    return ApiManager.api
      .post(`validations`, {
        json: data,
      })
      .json<ValidationDto>();
  },
  async getValidation(id: number) {
    return ApiManager.api.get(`validations/${id}`).json<ValidationDto>();
  },
  async updateValidation(id: number, data: UpdateValidationDto) {
    return ApiManager.api
      .patch(`validations/${id}`, {
        json: data,
      })
      .json<ValidationDto>();
  },
  async deleteValidation(id: number) {
    return ApiManager.api.delete(`validation/${id}`).json<number>();
  },
  async getGroupValidations(groupId: number) {
    return ApiManager.api.get(`groups/${groupId}/validations`).json<ValidationDto[]>();
  },
  // async uploadValidationFile(
  //   token: string,
  //   validationId: number,
  //   formData: FormData,
  //   onLoadStart: () => void,
  //   onLoad: () => void,
  //   onProgress: (event: ProgressEvent) => void,
  //   onError: () => void
  // ) {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open("POST", `${apiUrl}/validation/${validationId}/upload`);
  //   xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  //   xhr.upload.onloadstart = onLoadStart;
  //   xhr.upload.onprogress = onProgress;
  //   xhr.upload.onload = onLoad;
  //   xhr.upload.onerror = function() {
  //     console.log(`Error during file upload: ${xhr.status}.`);
  //     onError();
  //   };
  //   xhr.send(formData);
  // },
  async uploadValidationFile(validationId: number, formData: FormData) {
    return ApiManager.api.post(`validations/${validationId}/upload`, {
      body: formData,
      timeout: false,
    });
  },
  async deleteValidationFile(fileId: number) {
    return ApiManager.api.delete(`validationFiles/${fileId}`).json<number>();
  },
};
