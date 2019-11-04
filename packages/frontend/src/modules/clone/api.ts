import ky from "ky";
import { apiUrl } from "@/env";
import { CreateCloneDto, CloneDto, UpdateCloneDto } from "@airlab/shared/lib/clone/dto";

export const api = {
  async getClones(token: string) {
    return ky
      .get(`${apiUrl}/clone/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<CloneDto[]>();
  },
  async createClone(token: string, data: CreateCloneDto) {
    return ky
      .post(`${apiUrl}/clone/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<CloneDto>();
  },
  async getClone(token: string, id: number) {
    return ky
      .get(`${apiUrl}/clone/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<CloneDto>();
  },
  async updateClone(token: string, id: number, data: UpdateCloneDto) {
    return ky
      .patch(`${apiUrl}/clone/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<CloneDto>();
  },
  async deleteClone(token: string, id: number) {
    return ky
      .delete(`${apiUrl}/clone/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
  },
  async getAllClonesForUser(token: string) {
    return ky
      .get(`${apiUrl}/clone/getAllClonesForGroup`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<CloneDto[]>();
  },
};
