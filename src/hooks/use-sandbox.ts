import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

interface SandboxStatus {
  isWarm: boolean;
  previewUrl?: string;
  error?: Error;
}

export function useSandbox(projectId: string) {
  const queryClient = useQueryClient();
  const hasAttemptedInit = useRef(false); // The "Strict Mode" lock

  // 1. Status Query: Pings your Worker to see if 'npm run dev' is active
  const { data: status, isLoading: isChecking } = useQuery<SandboxStatus>({
    queryKey: ["sandbox-status", projectId],
    queryFn: async () => {
      const res = await fetch(`/api/sandbox/status?id=${projectId}`);
      if (!res.ok) throw new Error("Status check failed");
      return res.json(); // { isWarm: boolean, previewUrl: string }
    },
    // Poll every 30 seconds if the sandbox is warm, otherwise poll every 3 seconds
    refetchInterval: (query) => (query.state.data?.isWarm ? 30_000 : 3000),
  });

  // 2. Initialize Mutation: Tells the Worker to pull code and start the server
  const initMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/sandbox/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });
      return res.json();
    },
    onSuccess: () => {
      // Immediately refresh the status after triggering the boot
      queryClient.invalidateQueries({
        queryKey: ["sandbox-status", projectId],
      });
    },
  });

  // 3. Auto-Boot Logic with Strict Mode Protection
  useEffect(() => {
    const isCold = status?.isWarm === false;
    const isNotLoading = !initMutation.isPending && !isChecking;

    if (isCold && isNotLoading && !hasAttemptedInit.current) {
      hasAttemptedInit.current = true; // Lock the effect immediately
      initMutation.mutate();
    }
  }, [status?.isWarm, initMutation.isPending, isChecking, initMutation.mutate]);

  return {
    isWarm: status?.isWarm,
    previewUrl: status?.previewUrl,
    isBooting: initMutation.isPending || (status && !status.isWarm),
    error: initMutation.error || status?.error,
  };
}
