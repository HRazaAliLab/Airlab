import ky from "ky";
import { apiUrl } from "@/env";
import { CreateValidationDto, UpdateValidationDto, ValidationDto } from "@airlab/shared/lib/validation/dto";

export const api = {
  async getValidations(token: string) {
    return ky
      .get(`${apiUrl}/validations/accessible`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ValidationDto[]>();
  },
  async createValidation(token: string, data: CreateValidationDto) {
    return ky
      .post(`${apiUrl}/validations/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ValidationDto>();
  },
  async getValidation(token: string, id: number) {
    return ky
      .get(`${apiUrl}/validations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ValidationDto>();
  },
  async updateValidation(token: string, id: number, data: UpdateValidationDto) {
    return ky
      .patch(`${apiUrl}/validations/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ValidationDto>();
  },
  async deleteValidation(token: string, id: number) {
    return ky
      .delete(`${apiUrl}/validation/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
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
  async uploadValidationFile(token: string, validationId: number, formData: FormData) {
    return ky.post(`${apiUrl}/validations/${validationId}/upload`, {
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: false,
    });
  },
  async deleteValidationFile(token: string, fileId: number) {
    return ky
      .delete(`${apiUrl}/validationFiles/${fileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
  },
};
