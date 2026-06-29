export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlatformStats extends BaseEntity {
  documentsCount: number;
  topicsCount: number;
}

export interface Topic extends BaseEntity {
  title: string;
  description?: string;
  vaultCount: number;
}
