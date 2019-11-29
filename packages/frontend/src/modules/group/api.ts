import ky from "ky";
import { apiUrl } from "@/env";
import { CreateGroupDto, GroupDto, UpdateGroupDto } from "@airlab/shared/lib/group/dto";

export const api = {
  async getGroups(token: string) {
    return ky
      .get(`${apiUrl}/groups/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<GroupDto[]>();
  },
  async createGroup(token: string, data: CreateGroupDto) {
    return ky
      .post(`${apiUrl}/groups/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<GroupDto>();
  },
  async getGroup(token: string, id: number) {
    return ky
      .get(`${apiUrl}/groups/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<GroupDto>();
  },
  async updateGroup(token: string, id: number, data: UpdateGroupDto) {
    return ky
      .patch(`${apiUrl}/groups/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<GroupDto>();
  },
  async deleteGroup(token: string, id: number) {
    return ky
      .delete(`${apiUrl}/groups/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
  },
};
