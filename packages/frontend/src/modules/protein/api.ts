import ky from "ky";
import { apiUrl } from "@/env";
import { CreateProteinDto, ProteinDto, UpdateProteinDto } from "@airlab/shared/lib/protein/dto";

export const api = {
  async getProteins(token: string) {
    return ky
      .get(`${apiUrl}/proteins/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProteinDto[]>();
  },
  async createProtein(token: string, data: CreateProteinDto) {
    return ky
      .post(`${apiUrl}/proteins/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProteinDto>();
  },
  async getProtein(token: string, id: number) {
    return ky
      .get(`${apiUrl}/proteins/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProteinDto>();
  },
  async updateProtein(token: string, id: number, data: UpdateProteinDto) {
    return ky
      .patch(`${apiUrl}/proteins/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProteinDto>();
  },
  async deleteProtein(token: string, id: number) {
    return ky
      .delete(`${apiUrl}/proteins/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
  },
  async getAllProteinsForGroup(token: string, groupId: number) {
    return ky
      .get(`${apiUrl}/group/${groupId}/proteins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<ProteinDto[]>();
  },
};
