import { ApiManager } from "@/utils/api";
import { CreateReagentDto, ReagentDto, UpdateReagentDto } from "@airlab/shared/lib/reagent/dto";
import { LotDto } from "@airlab/shared/lib/lot/dto";

export const api = {
  async createReagent(data: CreateReagentDto) {
    return ApiManager.api
      .post(`reagents`, {
        json: data,
      })
      .json<ReagentDto>();
  },
  async getReagent(id: number) {
    return ApiManager.api.get(`reagents/${id}`).json<ReagentDto>();
  },
  async updateReagent(id: number, data: UpdateReagentDto) {
    return ApiManager.api
      .patch(`reagents/${id}`, {
        json: data,
      })
      .json<ReagentDto>();
  },
  async deleteReagent(id: number) {
    return ApiManager.api.delete(`reagents/${id}`).json<number>();
  },
  async getGroupReagents(groupId: number) {
    return ApiManager.api.get(`groups/${groupId}/reagents`).json<ReagentDto[]>();
  },
  async getReagentLots(id: number) {
    return ApiManager.api.get(`reagents/${id}/lots`).json<LotDto[]>();
  },
};
