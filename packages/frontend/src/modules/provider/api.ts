import ky from "ky";
import { apiUrl } from "@/env";
import { CreateProviderDto, ProviderDto, UpdateProviderDto } from "@airlab/shared/lib/provider/dto";

export const api = {
  async createProvider(token: string, data: CreateProviderDto) {
    return ky
      .post(`${apiUrl}/providers/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProviderDto>();
  },
  async getProvider(token: string, id: number) {
    return ky
      .get(`${apiUrl}/providers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProviderDto>();
  },
  async updateProvider(token: string, id: number, data: UpdateProviderDto) {
    return ky
      .patch(`${apiUrl}/providers/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProviderDto>();
  },
  async deleteProvider(token: string, id: number) {
    return ky
      .delete(`${apiUrl}/providers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
  },
  async getGroupProviders(token: string, groupId: number) {
    return ky
      .get(`${apiUrl}/groups/${groupId}/providers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProviderDto[]>();
  },
};
