export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export interface Topic extends BaseEntity {
  title: string
  description?: string
  vaultCount: number
}

export interface VaultItem extends BaseEntity {
  topicId: string
  title: string
  content: string
  mediaUrl?: string
  type: 'text' | 'markdown' | 'code' | 'image'
}

export interface ApiErrorResponse {
  message: string
  status: number
  errors?: Record<string, string[]>
}
