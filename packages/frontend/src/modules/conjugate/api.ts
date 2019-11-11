import ky from "ky";
import { apiUrl } from "@/env";
import { ConjugateDto, CreateConjugateDto, UpdateConjugateDto } from "@airlab/shared/lib/conjugate/dto";

export const api = {
  async getConjugates(token: string) {
    return ky
      .get(`${apiUrl}/conjugate/getAllConjugatesForGroup`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ConjugateDto[]>();
  },
  async createConjugate(token: string, data: CreateConjugateDto) {
    return ky
      .post(`${apiUrl}/conjugate/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ConjugateDto>();
  },
  async getConjugate(token: string, id: number) {
    return ky
      .get(`${apiUrl}/conjugate/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ConjugateDto>();
  },
  async updateConjugate(token: string, id: number, data: UpdateConjugateDto) {
    return ky
      .patch(`${apiUrl}/conjugate/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ConjugateDto>();
  },
  async deleteConjugate(token: string, id: number) {
    return ky
      .delete(`${apiUrl}/conjugate/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
  },
};
