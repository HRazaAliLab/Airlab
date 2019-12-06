import { ApiManager } from "@/utils/api";
import { CreatePanelDto, DuplicatePanelDto, PanelDto, UpdatePanelDto } from "@airlab/shared/lib/panel/dto";

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
};
