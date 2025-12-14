import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import type { ChatMessage } from "@/types/chat";
import { ChatInput } from "./ChatInput";
import { ChatMessageComponent } from "./ChatMessage";

interface ChatProps {
  projectId: string;
  messages: ChatMessage[];
  onSendMessage: (content: string) => Promise<void>;
  isLoading?: boolean;
}

export function Chat({
  projectId: _projectId,
  messages,
  onSendMessage,
  isLoading = false,
}: ChatProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const messageCount = messages.length;
    if (messageCount === 0) return;

    if (shouldAutoScroll && scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages.length, shouldAutoScroll]);

  // Check if user has scrolled up manually
  const handleScroll = useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        const isAtBottom =
          Math.abs(
            scrollContainer.scrollHeight -
              scrollContainer.scrollTop -
              scrollContainer.clientHeight
          ) < 50;
        setShouldAutoScroll(isAtBottom);
      }
    }
  }, []);

  // Add scroll listener
  useEffect(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  return (
    <div className="flex flex-col h-full bg-zinc-950/50 rounded-lg border border-zinc-800 overflow-hidden">
      {/* Messages area */}
      <div className="flex-1 min-h-0">
        <ScrollArea ref={scrollAreaRef} className="h-full px-4 py-4">
          <div className="space-y-4 max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-zinc-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Chat bubble icon</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-zinc-300 mb-2">
                Start a conversation
              </h3>
              <p className="text-sm text-zinc-500 max-w-sm">
                Describe the changes you want to make to your video, or ask
                questions about your project.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessageComponent key={message.id} message={message} />
            ))
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="mb-6 animate-in fade-in-0 duration-200">
              <div className="flex items-center gap-2 bg-zinc-800/20 text-zinc-400 rounded-lg px-4 py-2.5 border border-zinc-700/30 max-w-[85%]">
                <Spinner className="w-4 h-4" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          )}
        </div>
        </ScrollArea>
      </div>

      {/* Input area */}
      <ChatInput
        onSendMessage={onSendMessage}
        placeholder="Describe what you want to change..."
        disabled={isLoading}
      />
    </div>
  );
}
