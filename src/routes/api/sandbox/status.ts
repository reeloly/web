import { env } from "cloudflare:workers";
import { auth } from "@clerk/tanstack-react-start/server";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

export const Route = createFileRoute("/api/sandbox/status")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const projectId = url.searchParams.get("id");
        if (!projectId) {
          return json({ error: "Project ID is required" }, { status: 400 });
        }

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

        const sandboxUrl =
          env.ENVIRONMENT === "development"
            ? env.LOCAL_SANDBOX_URL
            : `https://8080-${projectId}.reelolyproject.com`;

        const response = await fetch(`${sandboxUrl}/_sandbox/status`, {
          headers: {
            // Forward the cookie so the backend knows who the user is
            Cookie: cookie || "",
            "Content-Type": "application/json",
          },
          method: "GET",
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
