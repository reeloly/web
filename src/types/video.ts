export interface Video {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  url?: string;
  thumbnailUrl?: string;
  duration?: number;
  status: VideoStatus;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export enum VideoStatus {
  DRAFT = "draft",
  PROCESSING = "processing",
  READY = "ready",
  FAILED = "failed",
}

export interface CreateVideoInput {
  projectId: string;
  name: string;
  description?: string;
}

export interface UpdateVideoInput {
  name?: string;
  description?: string;
  url?: string;
  thumbnailUrl?: string;
  status?: VideoStatus;
}
