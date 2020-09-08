import { ApiManager } from "@/utils/api";
import { CreateLotDto, LotDto, ReorderLotDto, UpdateLotDto, UpdateLotStatusDto } from "@airlab/shared/lib/lot/dto";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { UpdateStateDto } from "@airlab/shared/lib/core/dto";
import { getQueryString, RequestQuery } from "@/utils/QueryBuilder";

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
  async updateLotArchiveState(id: number, data: UpdateStateDto) {
    return ApiManager.api
      .patch(`lots/${id}/archive`, {
        json: data,
      })
      .json<LotDto>();
  },
  async updateLotStatus(id: number, data: UpdateLotStatusDto) {
    return ApiManager.api
      .patch(`lots/${id}/status`, {
        json: data,
      })
      .json<LotDto>();
  },
  async reorderLot(id: number, data: ReorderLotDto) {
    return ApiManager.api
      .put(`lots/${id}/reorder`, {
        json: data,
      })
      .json<LotDto>();
  },
  async deleteLot(id: number) {
    return ApiManager.api.delete(`lots/${id}`).json<number>();
  },
  async getGroupLots(groupId: number, query?: RequestQuery) {
    const queryString = getQueryString(query);
    return ApiManager.api.get(`groups/${groupId}/lots${queryString}`).json<LotDto[]>();
  },
  async getLotConjugates(lotId: number) {
    return ApiManager.api.get(`lots/${lotId}/conjugates`).json<ConjugateDto[]>();
  },
};
