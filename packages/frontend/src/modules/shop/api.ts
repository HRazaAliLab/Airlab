import { ApiManager } from "@/utils/api";

export const api = {
  async searchAntibody(search: string) {
    return ApiManager.api.get(`reagents/search/${search}`).text();
  },
};
