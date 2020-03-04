import { ApiManager } from "@/utils/api";
import { CloneDto, CreateCloneDto, UpdateCloneDto } from "@airlab/shared/lib/clone/dto";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import { ValidationDto } from "@airlab/shared/lib/validation/dto";
import { UpdateStateDto } from "@airlab/shared/lib/core/dto";

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
  async updateCloneArchiveState(id: number, data: UpdateStateDto) {
    return ApiManager.api
      .patch(`clones/${id}/archive`, {
        json: data,
      })
      .json<CloneDto>();
  },
  async getGroupClones(groupId: number) {
    return ApiManager.api.get(`groups/${groupId}/clones`).json<CloneDto[]>();
  },
  async getCloneLots(cloneId: number) {
    return ApiManager.api.get(`clones/${cloneId}/lots`).json<LotDto[]>();
  },
  async getCloneValidations(cloneId: number) {
    return ApiManager.api.get(`clones/${cloneId}/validations`).json<ValidationDto[]>();
  },
};
