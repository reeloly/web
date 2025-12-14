import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { type ChatMessage, MessageRole } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessage;
}

export function ChatMessageComponent({ message }: ChatMessageProps) {
  const isUser = message.role === MessageRole.USER;
  const isAssistant = message.role === MessageRole.ASSISTANT;
  const isSystem = message.role === MessageRole.SYSTEM;

  return (
    <div
      className={cn(
        "group mb-8 animate-in fade-in-0 slide-in-from-bottom-1 duration-200",
        isUser && "flex justify-end"
      )}
    >
      {/* Message content */}
      <div
        className={cn(
          "flex flex-col gap-1.5",
          // User messages: constrained width, right-aligned
          isUser && "max-w-[85%] items-end",
          // Assistant/system: full width, document-like
          (isAssistant || isSystem) && "w-full"
        )}
      >
        {/* Message bubble */}
        <div
          className={cn(
            "break-words",
            // User message: bubble style
            isUser &&
              "rounded-lg px-4 py-2.5 bg-zinc-800/40 text-zinc-100 border border-zinc-700/50",
            // Assistant message: document style (full width, minimal background)
            isAssistant && "w-full px-0 py-1 text-zinc-200",
            // System message: subtle, italic
            isSystem &&
              "px-3 py-2 bg-zinc-900/20 text-zinc-500 text-sm italic border border-zinc-800/30 rounded-md"
          )}
        >
          <p
            className={cn(
              "whitespace-pre-wrap",
              // User: compact line height
              isUser && "leading-[1.7] text-[15px]",
              // Assistant: spacious, document-like
              isAssistant && "leading-[1.8] text-[15px]",
              // System: smaller
              isSystem && "leading-[1.6] text-[14px]"
            )}
          >
            {message.content}
          </p>
        </div>

        {/* Timestamp - only show on hover */}
        <span
          className={cn(
            "text-xs text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity",
            isUser && "px-1",
            isAssistant && "px-0"
          )}
        >
          {format(message.createdAt, "h:mm a")}
        </span>
      </div>
    </div>
  );
}
