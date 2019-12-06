import { ApiManager } from "@/utils/api";
import { CreateSpeciesDto, SpeciesDto, UpdateSpeciesDto } from "@airlab/shared/lib/species/dto";

export const api = {
  async createSpecies(data: CreateSpeciesDto) {
    return ApiManager.api
      .post(`species`, {
        json: data,
      })
      .json<SpeciesDto>();
  },
  async getSpecies(id: number) {
    return ApiManager.api.get(`species/${id}`).json<SpeciesDto>();
  },
  async updateSpecies(id: number, data: UpdateSpeciesDto) {
    return ApiManager.api
      .patch(`species/${id}`, {
        json: data,
      })
      .json<SpeciesDto>();
  },
  async deleteSpecies(id: number) {
    return ApiManager.api.delete(`species/${id}`).json<number>();
  },
  async getGroupSpecies(groupId: number) {
    return ApiManager.api.get(`groups/${groupId}/species`).json<SpeciesDto[]>();
  },
};
