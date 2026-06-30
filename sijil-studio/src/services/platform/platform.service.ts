import { api, endpoints } from "@/lib/api";

export const platformService = {
  stats() {
    return api.get(endpoints.platform.stats);
  },
};
