import { Send } from "lucide-react";
import {
  type KeyboardEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  placeholder?: string;
  /**
   * Disables sending (button + Enter-to-send), but still allows typing.
   * This is important because disabling a focused textarea will force it to blur.
   */
  disabled?: boolean;
  /** Disables typing (textarea). Use sparingly. */
  inputDisabled?: boolean;
}

export function ChatInput({
  onSendMessage,
  placeholder = "Type your message...",
  disabled = false,
  inputDisabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const prevInputDisabledRef = useRef(inputDisabled);
  const latestMessageRef = useRef(message);

  useEffect(() => {
    latestMessageRef.current = message;
  }, [message]);

  // If the textarea was disabled (which blurs it) and becomes enabled again, restore focus.
  useEffect(() => {
    const wasDisabled = prevInputDisabledRef.current;
    if (wasDisabled && !inputDisabled) {
      textareaRef.current?.focus();
    }
    prevInputDisabledRef.current = inputDisabled;
  }, [inputDisabled]);

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
    setSendError(null);
    setFailedMessage(null);

    const outgoingMessage = trimmedMessage;

    // Clear + refocus immediately so the user can start typing the next message
    // while the async send (and any streaming response) is happening.
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }
    try {
      await onSendMessage(outgoingMessage);
    } catch (error) {
      // React doesn't await event handlers; ensure errors don't become unhandled promise rejections.
      console.error("Error sending message:", error);
      setSendError("Failed to send message. Please try again.");

      // If the user hasn't started typing a new draft yet, restore the failed message
      // so they can retry without losing it. Otherwise, keep it available via "Restore".
      const currentDraft = latestMessageRef.current;
      if (currentDraft.trim().length === 0) {
        setMessage(outgoingMessage);
        // Keep focus for quick retry.
        textareaRef.current?.focus();
      } else {
        setFailedMessage(outgoingMessage);
      }
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
          disabled={inputDisabled}
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
      {sendError && (
        <div className="mt-2 max-w-4xl mx-auto flex items-center justify-between gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
          <span>{sendError}</span>
          {failedMessage && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-red-100 hover:text-red-50 hover:bg-red-500/10"
              onClick={() => {
                setMessage(failedMessage);
                setFailedMessage(null);
                setSendError(null);
                textareaRef.current?.focus();
              }}
            >
              Restore
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
