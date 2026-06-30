import { useApiQuery } from "@/hooks/api";
import { platformService } from "../services/platform.service";

export function useHealth() {
  return useApiQuery({
    queryKey: ["health"],
    queryFn: platformService.health,
  });
}
