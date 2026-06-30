import { useApiQuery } from "@/hooks/api";
import { platformService } from "../services/platform.service";
import { queryKeys } from "@/lib/query";

export function usePlatformStats() {
  return useApiQuery({
    queryKey: queryKeys.platform.stats,
    queryFn: () => platformService.stats(),
  });
}
