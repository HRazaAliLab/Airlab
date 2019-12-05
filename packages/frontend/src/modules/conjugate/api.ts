import ky from "ky";
import { apiUrl } from "@/env";
import { ConjugateDto, CreateConjugateDto, UpdateConjugateDto } from "@airlab/shared/lib/conjugate/dto";

export const api = {
  async createConjugate(token: string, data: CreateConjugateDto) {
    return ky
      .post(`${apiUrl}/conjugates/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ConjugateDto>();
  },
  async getConjugate(token: string, id: number) {
    return ky
      .get(`${apiUrl}/conjugates/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ConjugateDto>();
  },
  async updateConjugate(token: string, id: number, data: UpdateConjugateDto) {
    return ky
      .patch(`${apiUrl}/conjugates/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ConjugateDto>();
  },
  async deleteConjugate(token: string, id: number) {
    return ky
      .delete(`${apiUrl}/conjugates/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
  },
  async getGroupConjugates(token: string, groupId: number) {
    return ky
      .get(`${apiUrl}/groups/${groupId}/conjugates`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ConjugateDto[]>();
  },
};
