import ky from "ky";
import { apiUrl } from "@/env";
import { CreateSpeciesDto, SpeciesDto, UpdateSpeciesDto } from "@airlab/shared/lib/species/dto";

export const api = {
  async createSpecies(token: string, data: CreateSpeciesDto) {
    return ky
      .post(`${apiUrl}/species/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<SpeciesDto>();
  },
  async getSpecies(token: string, id: number) {
    return ky
      .get(`${apiUrl}/species/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<SpeciesDto>();
  },
  async updateSpecies(token: string, id: number, data: UpdateSpeciesDto) {
    return ky
      .patch(`${apiUrl}/species/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<SpeciesDto>();
  },
  async deleteSpecies(token: string, id: number) {
    return ky
      .delete(`${apiUrl}/species/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
  },
  async getGroupSpecies(token: string, groupId: number) {
    return ky
      .get(`${apiUrl}/groups/${groupId}/species`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<SpeciesDto[]>();
  },
};
