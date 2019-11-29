import ky from "ky";
import { apiUrl } from "@/env";
import { CreatePanelDto, DuplicatePanelDto, PanelDto, UpdatePanelDto } from "@airlab/shared/lib/panel/dto";

export const api = {
  async getPanels(token: string) {
    return ky
      .get(`${apiUrl}/panels/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<PanelDto[]>();
  },
  async createPanel(token: string, data: CreatePanelDto) {
    return ky
      .post(`${apiUrl}/panels/`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<PanelDto>();
  },
  async getPanel(token: string, id: number) {
    return ky
      .get(`${apiUrl}/panels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<PanelDto>();
  },
  async updatePanel(token: string, id: number, data: UpdatePanelDto) {
    return ky
      .patch(`${apiUrl}/panels/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<PanelDto>();
  },
  async duplicatePanel(token: string, id: number, data: DuplicatePanelDto) {
    return ky
      .put(`${apiUrl}/panels/${id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<PanelDto>();
  },
  async deletePanel(token: string, id: number) {
    return ky
      .delete(`${apiUrl}/panels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<number>();
  },
  async getAllPanelsForGroup(token: string, groupId: number) {
    return ky
      .get(`${apiUrl}/group/${groupId}/panels`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<PanelDto[]>();
  },
};
