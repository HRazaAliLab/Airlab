import ky from "ky";
import { apiUrl } from "@/env";
import { CreateProviderDto, ProviderDto, UpdateProviderDto } from "@airlab/shared/lib/provider/dto";

export const api = {
  async getProviders(token: string) {
    return ky
      .get(`${apiUrl}/provider/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProviderDto[]>();
  },
  async createProvider(token: string, data: CreateProviderDto) {
    return ky
      .post(`${apiUrl}/provider/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProviderDto>();
  },
  async getProvider(token: string, id: number) {
    return ky
      .get(`${apiUrl}/provider/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProviderDto>();
  },
  async updateProvider(token: string, id: number, data: UpdateProviderDto) {
    return ky
      .patch(`${apiUrl}/provider/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProviderDto>();
  },
  async deleteProvider(token: string, id: number) {
    return ky
      .delete(`${apiUrl}/provider/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
  },
};
