export interface Project {
  id: string;
  name: string;
  description?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  thumbnailUrl?: string;
  lastVideoId?: string;
}

export interface CreateProjectInput {
  name: string;
  description?: string;
}

export interface UpdateProjectInput {
  name?: string;
  description?: string;
  thumbnailUrl?: string;
  lastVideoId?: string;
}
