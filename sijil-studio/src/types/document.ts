import { BaseEntity } from "./common";

export interface Document extends BaseEntity {
  title: string;
  status: string;
}
