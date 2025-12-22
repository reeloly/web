import { env } from "cloudflare:workers";
import { auth } from "@clerk/tanstack-react-start/server";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { z } from "zod";

export const Route = createFileRoute("/api/sandbox")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { isAuthenticated } = await auth();
        if (!isAuthenticated) {
          throw redirect({
            to: "/",
          });
        }

        const headers = request.headers;
        const cookie = headers.get("cookie");
        if (!cookie) {
          return json({ error: "Cookie is required" }, { status: 400 });
        }

        const token = headers.get("Authorization");
        if (!token) {
          return json(
            { error: "Authorization token is required" },
            { status: 400 }
          );
        }

        const body = await request.json();
        const parsed = z
          .object({ projectId: z.string().min(1) })
          .safeParse(body);
        if (!parsed.success) {
          return json({ error: "Project ID is required" }, { status: 400 });
        }
        const { projectId } = parsed.data;

        const sandboxUrl =
          env.ENVIRONMENT === "development"
            ? `${env.LOCAL_SANDBOX_URL}/_sandbox/status`
            : `https://8080-${projectId}.reelolyproject.com/_sandbox/status`;

        const response = await fetch(`${sandboxUrl}?projectId=${projectId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          return json(
            { error: `Failed to get sandbox status: ${errorText}` },
            { status: response.status }
          );
        }

        const data = await response.json();
        return json(data);
      },
    },
  },
});
