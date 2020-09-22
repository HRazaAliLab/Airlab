import { ApiManager } from "@/utils/api";
import {
  ConjugateDto,
  CreateConjugateDto,
  UpdateConjugateDto,
  UpdateConjugateStatusDto,
} from "@airlab/shared/lib/conjugate/dto";
import { PanelDto } from "@airlab/shared/lib/panel/dto";
import { UpdateStateDto } from "@airlab/shared/lib/core/dto";
import { CloneDto } from "@airlab/shared/lib/clone/dto";
import { ValidationDto } from "@airlab/shared/lib/validation/dto";

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
  async updateConjugateArchiveState(id: number, data: UpdateStateDto) {
    return ApiManager.api
      .patch(`conjugates/${id}/archive`, {
        json: data,
      })
      .json<ConjugateDto>();
  },
  async updateConjugateStatus(id: number, data: UpdateConjugateStatusDto) {
    return ApiManager.api
      .patch(`conjugates/${id}/status`, {
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
    return ApiManager.api.get(`conjugates/${id}/panels`).json<PanelDto[]>();
  },
  async getConjugateClones(id: number) {
    return ApiManager.api.get(`conjugates/${id}/clones`).json<CloneDto[]>();
  },
  async getConjugateValidations(conjugateId: number) {
    return ApiManager.api.get(`conjugates/${conjugateId}/validations`).json<ValidationDto[]>();
  },
};
