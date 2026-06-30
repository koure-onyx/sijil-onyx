import { documentService } from "./document.service";

export const documentsApi = {
  getAll: documentService.all,
};
