import { ApiManager } from "@/utils/api";
import { CreateProviderDto, ProviderDto, UpdateProviderDto } from "@airlab/shared/lib/provider/dto";

export const api = {
  async createProvider(data: CreateProviderDto) {
    return ApiManager.api
      .post(`providers`, {
        json: data,
      })
      .json<ProviderDto>();
  },
  async getProvider(id: number) {
    return ApiManager.api.get(`providers/${id}`).json<ProviderDto>();
  },
  async updateProvider(id: number, data: UpdateProviderDto) {
    return ApiManager.api
      .patch(`providers/${id}`, {
        json: data,
      })
      .json<ProviderDto>();
  },
  async deleteProvider(id: number) {
    return ApiManager.api.delete(`providers/${id}`).json<number>();
  },
  async getGroupProviders(groupId: number) {
    return ApiManager.api.get(`groups/${groupId}/providers`).json<ProviderDto[]>();
  },
};
