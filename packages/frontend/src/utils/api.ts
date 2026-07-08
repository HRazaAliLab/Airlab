import ky, { type KyInstance } from "ky";
import { apiUrl } from "@/env";

export class ApiManager {
  private static _token: string;
  private static _api: KyInstance;

  static init(token: string) {
    ApiManager._token = token;
    ApiManager._api = ky.extend({
      prefixUrl: apiUrl,
      throwHttpErrors: true,
      hooks: {
        beforeRequest: [
          async (request) => {
            request.headers.set("Authorization", `Bearer ${ApiManager._token}`);
          },
        ],
        afterResponse: [
          async (request, options, response) => {
            if (!response.ok) {
              try {
                const errorJson = await response.json() as any;
                return new Response(null, {
                  status: errorJson.statusCode,
                  statusText: errorJson.message ? errorJson.message : errorJson.error,
                });
              } catch (e) {
                console.log(e);
              }
            }
          },
        ],
      },
    });
  }

  static get api() {
    return ApiManager._api;
  }
}
