import { createServerFn } from "@tanstack/react-start";

export type StreamChunk = {
  content: string;
};

/**
 * Server function that streams AI responses using an async generator.
 * This simulates an AI response by streaming chunks of text with delays.
 */
export const streamAIResponse = createServerFn({
  method: "POST",
})
  .inputValidator((data: { message: string; projectId: string }) => data)
  .handler(async function* ({
    data,
  }): AsyncGenerator<StreamChunk, void, unknown> {
    // Simulate AI response with streaming
    const response = `I understand your request about "${data.message}". I'll work on updating the video based on your feedback. This is a simulated streaming response - in production, this would connect to your AI backend and stream real responses.`;

    // Split the response into words for streaming
    const words = response.split(" ");

    // Initial delay to ensure client's for-await loop is ready
    // This prevents the first chunks from being dropped due to race condition
    // In production with a real AI API, there's a natural delay before first token
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Stream each word with a delay
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      // Add the word with a space (except for the last word)
      const chunk = i < words.length - 1 ? `${word} ` : word;

      // TanStack Start expects objects to be yielded, not primitive strings
      yield { content: chunk };

      // Delay between chunks to simulate realistic AI generation
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  });
