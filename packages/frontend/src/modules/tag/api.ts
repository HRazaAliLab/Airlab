import { ApiManager } from "@/utils/api";
import { CreateTagDto, TagDto, UpdateTagDto } from "@airlab/shared/lib/tag/dto";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";

export const api = {
  async createTag(data: CreateTagDto) {
    return ApiManager.api
      .post(`tags`, {
        json: data,
      })
      .json<TagDto>();
  },
  async getTag(id: number) {
    return ApiManager.api.get(`tags/${id}`).json<TagDto>();
  },
  async updateTag(id: number, data: UpdateTagDto) {
    return ApiManager.api
      .patch(`tags/${id}`, {
        json: data,
      })
      .json<TagDto>();
  },
  async deleteTag(id: number) {
    return ApiManager.api.delete(`tags/${id}`).json<number>();
  },
  async getGroupTags(groupId: number) {
    return ApiManager.api.get(`groups/${groupId}/tags`).json<TagDto[]>();
  },
  async getTagConjugates(tagId: number) {
    return ApiManager.api.get(`tags/${tagId}/conjugates`).json<ConjugateDto[]>();
  },
};
