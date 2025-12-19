import { ClerkProvider } from "@clerk/tanstack-react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useMatches,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import appCss from "@/styles/globals.css?url";

const fetchClerkAuth = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await auth();

  return {
    userId,
  };
});

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { userId } = await fetchClerkAuth();

    return {
      userId,
    };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Reel Ads - AI Video Creator",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Syne:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const matches = useMatches();
  const [queryClient] = useState(() => new QueryClient());

  // Hide sidebar on individual project pages
  const isProjectPage = matches.some(
    (match) => match.routeId === "/_authed/projects/$projectId"
  );

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <html lang="en" className="dark">
          <head>
            <HeadContent />
          </head>
          <body>
            <SidebarProvider defaultOpen={true}>
              {!isProjectPage && <AppSidebar />}

              <SidebarInset>
                {!isProjectPage && (
                  <header className="sticky top-0 flex h-14 items-center gap-3 px-4 bg-zinc-950 border-b border-zinc-800 z-10">
                    <SidebarTrigger />
                    <img
                      src="/reeloly-wordmark.svg"
                      alt="Reeloly"
                      className="h-6 w-auto text-coral"
                    />
                  </header>
                )}
                {children}
              </SidebarInset>
            </SidebarProvider>

            <TanStackDevtools
              config={{
                position: "bottom-right",
              }}
              plugins={[
                {
                  name: "Tanstack Router",
                  render: <TanStackRouterDevtoolsPanel />,
                },
              ]}
            />
            <Scripts />
          </body>
        </html>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
