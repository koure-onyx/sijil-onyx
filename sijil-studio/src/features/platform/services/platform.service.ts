import { api } from "@/lib/api";
import type { PlatformStats } from "@/types";

export const platformService = {
  async health() {
    const { data } = await api.get("/health");
    return data;
  },

  async stats() {
    const { data } = await api.get<PlatformStats>("/platform/stats");
    return data;
  },
};
