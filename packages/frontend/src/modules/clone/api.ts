import ky from "ky";
import { apiUrl } from "@/env";
import { CreateCloneDto, CloneDto, UpdateCloneDto } from "@airlab/shared/lib/clone/dto";

export const api = {
  async createClone(token: string, data: CreateCloneDto) {
    return ky
      .post(`${apiUrl}/clones/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<CloneDto>();
  },
  async getClone(token: string, id: number) {
    return ky
      .get(`${apiUrl}/clones/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<CloneDto>();
  },
  async updateClone(token: string, id: number, data: UpdateCloneDto) {
    return ky
      .patch(`${apiUrl}/clones/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<CloneDto>();
  },
  async deleteClone(token: string, id: number) {
    return ky
      .delete(`${apiUrl}/clones/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
  },
  async getGroupClones(token: string, groupId: number) {
    return ky
      .get(`${apiUrl}/groups/${groupId}/clones`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<CloneDto[]>();
  },
};
