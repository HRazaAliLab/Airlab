import ky from "ky";
import { apiUrl } from "@/env";
import { CreateLotDto, LotDto, UpdateLotDto } from "@airlab/shared/lib/lot/dto";

export const api = {
  async createLot(token: string, data: CreateLotDto) {
    return ky
      .post(`${apiUrl}/lots/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<LotDto>();
  },
  async getLot(token: string, id: number) {
    return ky
      .get(`${apiUrl}/lots/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<LotDto>();
  },
  async updateLot(token: string, id: number, data: UpdateLotDto) {
    return ky
      .patch(`${apiUrl}/lots/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<LotDto>();
  },
  async deleteLot(token: string, id: number) {
    return ky
      .delete(`${apiUrl}/lots/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
  },
  async getGroupLots(token: string, groupId: number) {
    return ky
      .get(`${apiUrl}/groups/${groupId}/lots`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<LotDto[]>();
  },
};
