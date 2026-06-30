import { Document } from "@/types";

export interface DocumentFormData {
  title: string;
  status: string;
}

export type DocumentFilters = Partial<Pick<Document, "status">>;
