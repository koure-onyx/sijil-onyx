import { PlatformStats } from "@/types/models";

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  version: string;
}

export interface PlatformStatsResponse {
  stats: PlatformStats;
}
