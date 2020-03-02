import { ApiManager } from "@/utils/api";
import {
  CreatePanelDto,
  DuplicatePanelDto,
  PanelDto,
  PanelElementDataDto,
  UpdatePanelDto,
} from "@airlab/shared/lib/panel/dto";
import { UpdateArchiveStateDto } from "@airlab/shared/lib/core/dto";

export const api = {
  async createPanel(data: CreatePanelDto) {
    return ApiManager.api
      .post(`panels`, {
        json: data,
      })
      .json<PanelDto>();
  },
  async getPanel(id: number) {
    return ApiManager.api.get(`panels/${id}`).json<PanelDto>();
  },
  async updatePanel(id: number, data: UpdatePanelDto) {
    return ApiManager.api
      .patch(`panels/${id}`, {
        json: data,
      })
      .json<PanelDto>();
  },
  async updatePanelArchiveState(id: number, data: UpdateArchiveStateDto) {
    return ApiManager.api
      .patch(`panels/${id}/archive`, {
        json: data,
      })
      .json<PanelDto>();
  },
  async duplicatePanel(id: number, data: DuplicatePanelDto) {
    return ApiManager.api
      .put(`panels/${id}`, {
        json: data,
      })
      .json<PanelDto>();
  },
  async deletePanel(id: number) {
    return ApiManager.api.delete(`panels/${id}`).json<number>();
  },
  async getGroupPanels(groupId: number) {
    return ApiManager.api.get(`groups/${groupId}/panels`).json<PanelDto[]>();
  },
  async getPanelElements(panelId: number) {
    return ApiManager.api.get(`panels/${panelId}/elements`).json<PanelElementDataDto[]>();
  },
};
