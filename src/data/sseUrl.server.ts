import { env } from "cloudflare:workers";
import { createServerFn } from "@tanstack/react-start";

export const getSSEUrl = createServerFn({ method: "GET" })
  .inputValidator((data: { projectId: string }) => data)
  .handler(async ({ data }) => {
    if (env.ENVIRONMENT === "development") {
      return `${env.LOCAL_SANDBOX_URL}/_messages`;
    } else {
      const sandboxUrl = `https://8080-${data.projectId}.reelolyproject.com`;
      return `${sandboxUrl}/_messages`;
    }
  });
