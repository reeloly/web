import { Send } from "lucide-react";
import { type KeyboardEvent, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatInput({
  onSendMessage,
  placeholder = "Type your message...",
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset first so scrollHeight is accurate for shrinking as well as growing.
    textarea.style.height = "auto";

    // When cleared, keep the default (single-row) height.
    if (message.length === 0) return;

    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [message]);

  const handleSend = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled || isSending) return;

    setIsSending(true);
    try {
      await onSendMessage(trimmedMessage);
      setMessage("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (error) {
      // React doesn't await event handlers; ensure errors don't become unhandled promise rejections.
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  return (
    <div className="sticky bottom-0 bg-zinc-950/95 backdrop-blur-sm border-t border-zinc-800 p-4">
      <div className="flex gap-2 items-end max-w-4xl mx-auto">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="min-h-[44px] max-h-[200px] resize-none bg-zinc-900 border-zinc-700 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 text-zinc-100 placeholder:text-zinc-500"
          rows={1}
        />
        <Button
          onClick={() => {
            void handleSend();
          }}
          disabled={!message.trim() || disabled || isSending}
          size="icon"
          className="h-[44px] w-[44px] flex-shrink-0 bg-coral-hover disabled:bg-zinc-800 disabled:text-zinc-600"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
      <p className="text-xs text-zinc-500 text-center mt-2">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}
