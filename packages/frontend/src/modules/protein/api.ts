import { ApiManager } from "@/utils/api";
import { CreateProteinDto, ProteinDto, UpdateProteinDto } from "@airlab/shared/lib/protein/dto";

export const api = {
  async createProtein(data: CreateProteinDto) {
    return ApiManager.api
      .post(`proteins`, {
        json: data,
      })
      .json<ProteinDto>();
  },
  async getProtein(id: number) {
    return ApiManager.api.get(`proteins/${id}`).json<ProteinDto>();
  },
  async updateProtein(id: number, data: UpdateProteinDto) {
    return ApiManager.api
      .patch(`proteins/${id}`, {
        json: data,
      })
      .json<ProteinDto>();
  },
  async deleteProtein(id: number) {
    return ApiManager.api.delete(`proteins/${id}`).json<number>();
  },
  async getGroupProteins(groupId: number) {
    return ApiManager.api.get(`groups/${groupId}/proteins`).json<ProteinDto[]>();
  },
};
