import ky from "ky";
import { apiUrl } from "@/env";
import { CreateReagentDto, ReagentDto, UpdateReagentDto } from "@airlab/shared/lib/reagent/dto";

export const api = {
  async getReagents(token: string) {
    return ky
      .get(`${apiUrl}/reagent/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ReagentDto[]>();
  },
  async createReagent(token: string, data: CreateReagentDto) {
    return ky
      .post(`${apiUrl}/reagent/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ReagentDto>();
  },
  async getReagent(token: string, id: number) {
    return ky
      .get(`${apiUrl}/reagent/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ReagentDto>();
  },
  async updateReagent(token: string, id: number, data: UpdateReagentDto) {
    return ky
      .patch(`${apiUrl}/reagent/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ReagentDto>();
  },
  async deleteReagent(token: string, id: number) {
    return ky
      .delete(`${apiUrl}/reagent/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
  },
  async getAllReagentsForGroup(token: string, groupId: number) {
    return ky
      .get(`${apiUrl}/reagent/group/${groupId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ReagentDto[]>();
  },
};
