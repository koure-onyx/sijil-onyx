import { useApiQuery } from "@/hooks/api";
import { documentsApi } from "../api";
import { queryKeys } from "@/lib/query";

export function useDocuments() {
  return useApiQuery({
    queryKey: queryKeys.documents.all,
    queryFn: documentsApi.getAll,
  });
}
