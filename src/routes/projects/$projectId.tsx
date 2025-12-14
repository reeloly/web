import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Chat } from "@/components/project/Chat";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectResizable } from "@/components/project/ProjectResizable";
import { ProjectTabs } from "@/components/project/ProjectTabs";
import { streamAIResponse } from "@/data/chat.server";
import { getMockChatMessages, getMockProjects } from "@/lib/mockData";
import { type ChatMessage, MessageRole } from "@/types/chat";

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectPage,
});

let messageIdSeq = 0;
function createMessageId() {
  // Prefer collision-resistant IDs; fall back to a reasonably-unique client-side ID.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `msg-${crypto.randomUUID()}`;
  }
  messageIdSeq += 1;
  const rand = Math.random().toString(16).slice(2);
  return `msg-${Date.now()}-${messageIdSeq}-${rand}`;
}

function ProjectPage() {
  const { projectId } = Route.useParams();

  // Get project data from mock data
  const project = getMockProjects().find((p) => p.id === projectId);

  // Chat state management
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    getMockChatMessages(projectId)
  );
  const [isLoading, setIsLoading] = useState(false);

  // Handle sending a message
  const handleSendMessage = useCallback(
    async (content: string) => {
      // Add user message
      const userMessage: ChatMessage = {
        id: createMessageId(),
        projectId,
        role: MessageRole.USER,
        content,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Create a placeholder assistant message that will be streamed
      const assistantMessageId = createMessageId();
      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        projectId,
        role: MessageRole.ASSISTANT,
        content: "",
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      try {
        const stream = await streamAIResponse({
          data: { message: content, projectId },
        });

        for await (const msg of stream) {
          const chunk = msg.content;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessageId
                ? { ...m, content: m.content + chunk }
                : m
            )
          );
        }
      } catch (error) {
        console.error("Error streaming AI response:", error);
        // Update the message with an error
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content:
                    "Sorry, there was an error processing your request. Please try again.",
                }
              : msg
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [projectId]
  );

  // Chat component
  const chatContent = (
    <Chat
      projectId={projectId}
      messages={messages}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
    />
  );

  // Placeholder content for video preview (will be replaced in Task 10)
  const videoContent = (
    <div className="bg-zinc-900 rounded-lg p-4 h-full overflow-auto">
      <p className="text-zinc-400 text-sm">
        Video Preview Panel (Coming in Task 10)
      </p>
    </div>
  );

  return (
    <div className="h-screen cinematic-bg flex flex-col overflow-hidden">
      {/* Page container with responsive structure */}
      <div className="px-4 md:px-6 lg:px-8 py-6 flex-1 flex flex-col min-h-0">
        {/* Project-level header with back button and user avatar */}
        <ProjectHeader
          projectName={project?.name || "Untitled Project"}
          projectDescription={project?.description}
        />

        {/* Mobile Layout: Tab-based (visible only on mobile) */}
        <div className="lg:hidden flex-1 min-h-0">
          <ProjectTabs chatContent={chatContent} videoContent={videoContent} />
        </div>

        {/* Desktop Layout: Resizable panels (visible only on desktop) */}
        <div className="hidden lg:flex flex-1 min-h-0">
          <ProjectResizable
            chatContent={chatContent}
            videoContent={videoContent}
          />
        </div>
      </div>
    </div>
  );
}
