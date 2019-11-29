import ky from "ky";
import { apiUrl } from "@/env";
import { CreateTagDto, TagDto, UpdateTagDto } from "@airlab/shared/lib/tag/dto";

export const api = {
  async getTags(token: string) {
    return ky
      .get(`${apiUrl}/tags/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<TagDto[]>();
  },
  async createTag(token: string, data: CreateTagDto) {
    return ky
      .post(`${apiUrl}/tags/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<TagDto>();
  },
  async getTag(token: string, id: number) {
    return ky
      .get(`${apiUrl}/tags/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<TagDto>();
  },
  async updateTag(token: string, id: number, data: UpdateTagDto) {
    return ky
      .patch(`${apiUrl}/tags/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<TagDto>();
  },
  async deleteTag(token: string, id: number) {
    return ky
      .delete(`${apiUrl}/tags/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
  },
};
