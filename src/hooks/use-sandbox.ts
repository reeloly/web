import { useAuth } from "@clerk/tanstack-react-start";
import { useQuery } from "@tanstack/react-query";

interface SandboxStatus {
  isWarm: boolean;
  previewUrl?: string;
  error?: Error;
}

export function useSandbox(projectId: string) {
  const { getToken } = useAuth();

  // 1. Status Query: Pings your Worker to see if 'npm run dev' is active
  return useQuery<SandboxStatus>({
    queryKey: ["sandbox-status", projectId],
    queryFn: async () => {
      const token = await getToken();
      const res = await fetch(`/api/sandbox`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ projectId }),
      });
      if (!res.ok) {
        throw new Error("Status check failed");
      }
      return res.json(); // { isWarm: boolean, previewUrl: string }
    },
    // Poll every 30 seconds if the sandbox is warm, otherwise poll every 3 seconds
    refetchInterval: (query) => (query.state.data?.isWarm ? 30_000 : 3000),
  });
}
