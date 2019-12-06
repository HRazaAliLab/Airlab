import { ApiManager } from "@/utils/api";
import { CreateLotDto, LotDto, UpdateLotDto } from "@airlab/shared/lib/lot/dto";

export const api = {
  async createLot(data: CreateLotDto) {
    return ApiManager.api
      .post(`lots`, {
        json: data,
      })
      .json<LotDto>();
  },
  async getLot(id: number) {
    return ApiManager.api.get(`lots/${id}`).json<LotDto>();
  },
  async updateLot(id: number, data: UpdateLotDto) {
    return ApiManager.api
      .patch(`lots/${id}`, {
        json: data,
      })
      .json<LotDto>();
  },
  async deleteLot(id: number) {
    return ApiManager.api.delete(`lots/${id}`).json<number>();
  },
  async getGroupLots(groupId: number) {
    return ApiManager.api.get(`groups/${groupId}/lots`).json<LotDto[]>();
  },
};
