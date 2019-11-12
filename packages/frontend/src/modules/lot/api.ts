import ky from "ky";
import { apiUrl } from "@/env";
import { CreateLotDto, LotDto, UpdateLotDto } from "@airlab/shared/lib/lot/dto";

export const api = {
  async getLots(token: string) {
    return ky
      .get(`${apiUrl}/lot/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<LotDto[]>();
  },
  async createLot(token: string, data: CreateLotDto) {
    return ky
      .post(`${apiUrl}/lot/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<LotDto>();
  },
  async getLot(token: string, id: number) {
    return ky
      .get(`${apiUrl}/lot/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<LotDto>();
  },
  async updateLot(token: string, id: number, data: UpdateLotDto) {
    return ky
      .patch(`${apiUrl}/lot/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<LotDto>();
  },
  async deleteLot(token: string, id: number) {
    return ky
      .delete(`${apiUrl}/lot/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
  },
  async getAllLotsForGroup(token: string) {
    return ky
      .get(`${apiUrl}/lot/getAllLotsForGroup`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<LotDto[]>();
  },
};
