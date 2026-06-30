import { api, endpoints } from "@/lib/api";

export const authService = {
  profile() {
    return api.get(endpoints.auth.profile);
  },
};
