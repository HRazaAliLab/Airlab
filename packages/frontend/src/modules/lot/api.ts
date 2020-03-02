import { ApiManager } from "@/utils/api";
import { CreateLotDto, LotDto, UpdateLotDto } from "@airlab/shared/lib/lot/dto";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { UpdateArchiveStateDto } from "@airlab/shared/lib/core/dto";

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
  async updateLotArchiveState(id: number, data: UpdateArchiveStateDto) {
    return ApiManager.api
      .patch(`lots/${id}/archive`, {
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
  async getLotConjugates(lotId: number) {
    return ApiManager.api.get(`lots/${lotId}/conjugates`).json<ConjugateDto[]>();
  },
};
