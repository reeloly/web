export interface ChatMessage {
  id: string;
  projectId: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
  metadata?: Record<string, unknown>;
}

export enum MessageRole {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system",
}

export interface SendMessageInput {
  projectId: string;
  content: string;
  role: MessageRole;
}
