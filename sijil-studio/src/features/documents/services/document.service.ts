import { api, endpoints } from "@/lib/api";

export const documentService = {
  all() {
    return api.get(endpoints.documents.list);
  },
};
