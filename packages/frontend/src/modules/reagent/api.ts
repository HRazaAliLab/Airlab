import ky from "ky";
import { apiUrl } from "@/env";
import { CreateReagentDto, ReagentDto, UpdateReagentDto } from "@airlab/shared/lib/reagent/dto";

export const api = {
  async createReagent(token: string, data: CreateReagentDto) {
    return ky
      .post(`${apiUrl}/reagents/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ReagentDto>();
  },
  async getReagent(token: string, id: number) {
    return ky
      .get(`${apiUrl}/reagents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ReagentDto>();
  },
  async updateReagent(token: string, id: number, data: UpdateReagentDto) {
    return ky
      .patch(`${apiUrl}/reagents/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ReagentDto>();
  },
  async deleteReagent(token: string, id: number) {
    return ky
      .delete(`${apiUrl}/reagents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
  },
  async getGroupReagents(token: string, groupId: number) {
    return ky
      .get(`${apiUrl}/groups/${groupId}/reagents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ReagentDto[]>();
  },
};
