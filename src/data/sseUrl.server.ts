import { env } from "cloudflare:workers";
import { createServerFn } from "@tanstack/react-start";

export const getSSEUrl = createServerFn({ method: "GET" }).handler(async () => {
  const sandboxUrl = env.SANDBOX_URL;
  if (!sandboxUrl) throw new Error("SANDBOX_URL is not set");
  return `${sandboxUrl}/messages`;
});
