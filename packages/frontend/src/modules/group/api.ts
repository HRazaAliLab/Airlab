import { ApiManager } from "@/utils/api";
import { CreateGroupDto, GroupDto, UpdateGroupDto } from "@airlab/shared/lib/group/dto";

export const api = {
  async getGroups() {
    return ApiManager.api.get(`groups`).json<GroupDto[]>();
  },
  async createGroup(data: CreateGroupDto) {
    return ApiManager.api
      .post(`groups/`, {
        json: data,
      })
      .json<GroupDto>();
  },
  async getGroup(id: number) {
    return ApiManager.api.get(`groups/${id}`).json<GroupDto>();
  },
  async updateGroup(id: number, data: UpdateGroupDto) {
    return ApiManager.api
      .patch(`groups/${id}`, {
        json: data,
      })
      .json<GroupDto>();
  },
  async deleteGroup(id: number) {
    return ApiManager.api.delete(`groups/${id}`).json<number>();
  },
  async joinGroup(id: number) {
    return ApiManager.api.post(`groups/${id}/join`).json<boolean>();
  },
};
