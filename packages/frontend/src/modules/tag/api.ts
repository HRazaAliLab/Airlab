import ky from "ky";
import { apiUrl } from "@/env";
import { CreateTagDto, TagDto, UpdateTagDto } from "@airlab/shared/lib/tag/dto";

export const api = {
  async getTags(token: string) {
    return ky
      .get(`${apiUrl}/tag/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<TagDto[]>();
  },
  async createTag(token: string, data: CreateTagDto) {
    return ky
      .post(`${apiUrl}/tag/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<TagDto>();
  },
  async getTag(token: string, id: number) {
    return ky
      .get(`${apiUrl}/tag/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<TagDto>();
  },
  async updateTag(token: string, id: number, data: UpdateTagDto) {
    return ky
      .patch(`${apiUrl}/tag/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<TagDto>();
  },
  async deleteTag(token: string, id: number) {
    return ky
      .delete(`${apiUrl}/tag/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
  },
};
