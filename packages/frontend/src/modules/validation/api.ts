import ky from "ky";
import { apiUrl } from "@/env";
import { CreateValidationDto, UpdateValidationDto, ValidationDto } from "@airlab/shared/lib/validation/dto";

export const api = {
  async getValidations(token: string) {
    return ky
      .get(`${apiUrl}/validation/getAllValidationsForGroup`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ValidationDto[]>();
  },
  async createValidation(token: string, data: CreateValidationDto) {
    return ky
      .post(`${apiUrl}/validation/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ValidationDto>();
  },
  async getValidation(token: string, id: number) {
    return ky
      .get(`${apiUrl}/validation/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ValidationDto>();
  },
  async updateValidation(token: string, id: number, data: UpdateValidationDto) {
    return ky
      .patch(`${apiUrl}/validation/${id}`, {
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
};
