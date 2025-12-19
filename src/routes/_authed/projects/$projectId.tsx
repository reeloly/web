import { useAuth } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { type ReadyStateEvent, SSE, type SSEvent } from "sse.js";
import { Chat } from "@/components/project/Chat";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectResizable } from "@/components/project/ProjectResizable";
import { ProjectTabs } from "@/components/project/ProjectTabs";
import { Video } from "@/components/project/Video";
import {
  agentMessageDeltaEventSchema,
  agentMessageEndEventSchema,
} from "@/data/messages.types";
import { getSSEUrl } from "@/data/sseUrl.server";
import { getMockChatMessages, getMockProjects } from "@/lib/mockData";
import { type ChatMessage, MessageRole } from "@/types/chat";

export const Route = createFileRoute("/_authed/projects/$projectId")({
  loader: async ({ params }) => {
    const sseUrl = await getSSEUrl({ data: { projectId: params.projectId } });
    return { sseUrl };
  },
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
  const { sseUrl } = Route.useLoaderData();
  const { getToken } = useAuth();

  // Get project data from mock data
  const project = getMockProjects().find((p) => p.id === projectId);

  // Chat state management - initialize with empty array to avoid hydration mismatch
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sourceRef = useRef<SSE | null>(null);
  const hasEndedRef = useRef(false);

  useEffect(() => {
    return () => {
      sourceRef.current?.close();
      sourceRef.current = null;
    };
  }, []);

  // Load mock messages on client-side only to prevent hydration mismatch
  useEffect(() => {
    setMessages(getMockChatMessages(projectId));
  }, [projectId]);

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

      // Create a placeholder assistant message
      const assistantMessageId = createMessageId();
      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        projectId,
        role: MessageRole.ASSISTANT,
        content: "",
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Get authentication token
      const token = await getToken();

      // Create authenticated SSE connection
      const source = new SSE(sseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        payload: JSON.stringify({
          message: content,
          projectId: projectId,
        }),
        withCredentials: true,
        start: false,
      });
      sourceRef.current?.close();
      sourceRef.current = source;

      hasEndedRef.current = false;

      // Handle delta events (streaming chunks)
      source.addEventListener("agent.message.delta", (event: SSEvent) => {
        const parsed = agentMessageDeltaEventSchema.safeParse(
          JSON.parse(event.data)
        );

        if (parsed.success) {
          const chunk = parsed.data.delta;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessageId
                ? { ...m, content: m.content + chunk }
                : m
            )
          );
        } else {
          console.error("Invalid agent.message.delta event:", parsed.error);
        }
      });

      // Handle end event
      source.addEventListener("agent.message.end", (event: SSEvent) => {
        const parsed = agentMessageEndEventSchema.safeParse(
          JSON.parse(event.data)
        );

        if (parsed.success) {
          hasEndedRef.current = true;
          source.close();
          setIsLoading(false);
        } else {
          console.error("Invalid agent.message.end event:", parsed.error);
        }
      });

      // Handle errors
      source.addEventListener("error", (event: SSEvent) => {
        console.error("SSE error:", event);
        source.close();

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

        setIsLoading(false);
      });

      // Handle unexpected connection closure
      source.addEventListener("readystatechange", (event: ReadyStateEvent) => {
        if (event.readyState === SSE.CLOSED && !hasEndedRef.current) {
          console.warn("SSE connection closed unexpectedly");
          setIsLoading(false);
        }
      });

      // Start the SSE stream
      source.stream();
    },
    [projectId, sseUrl, getToken]
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

  // Video component
  const videoContent = <Video projectId={projectId} />;

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
