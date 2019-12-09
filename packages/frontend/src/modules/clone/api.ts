import { ApiManager } from "@/utils/api";
import { CreateCloneDto, CloneDto, UpdateCloneDto } from "@airlab/shared/lib/clone/dto";
import { LotDto } from "@airlab/shared/lib/lot/dto";

export const api = {
  async createClone(data: CreateCloneDto) {
    return ApiManager.api
      .post(`clones`, {
        json: data,
      })
      .json<CloneDto>();
  },
  async getClone(id: number) {
    return ApiManager.api.get(`clones/${id}`).json<CloneDto>();
  },
  async updateClone(id: number, data: UpdateCloneDto) {
    return ApiManager.api
      .patch(`clones/${id}`, {
        json: data,
      })
      .json<CloneDto>();
  },
  async deleteClone(id: number) {
    return ApiManager.api.delete(`clones/${id}`).json<number>();
  },
  async getGroupClones(groupId: number) {
    return ApiManager.api.get(`groups/${groupId}/clones`).json<CloneDto[]>();
  },
  async getCloneLots(cloneId: number) {
    return ApiManager.api.get(`clones/${cloneId}/lots`).json<LotDto[]>();
  },
};
