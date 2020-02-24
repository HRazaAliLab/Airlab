import { ApiManager } from "@/utils/api";
import { ConjugateDto, CreateConjugateDto, UpdateConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { PanelDto } from "@airlab/shared/lib/panel/dto";

export const api = {
  async createConjugate(data: CreateConjugateDto) {
    return ApiManager.api
      .post(`conjugates/`, {
        json: data,
      })
      .json<ConjugateDto>();
  },
  async getConjugate(id: number) {
    return ApiManager.api.get(`conjugates/${id}`).json<ConjugateDto>();
  },
  async updateConjugate(id: number, data: UpdateConjugateDto) {
    return ApiManager.api
      .patch(`conjugates/${id}`, {
        json: data,
      })
      .json<ConjugateDto>();
  },
  async deleteConjugate(id: number) {
    return ApiManager.api.delete(`conjugates/${id}`).json<number>();
  },
  async getGroupConjugates(groupId: number) {
    return ApiManager.api.get(`groups/${groupId}/conjugates`).json<ConjugateDto[]>();
  },
  async getConjugatePanels(id: number) {
    return ApiManager.api.get(`conjugate/${id}/panels`).json<PanelDto[]>();
  },
};
