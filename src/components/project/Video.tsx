import { useSandbox } from "@/hooks/use-sandbox";

interface VideoProps {
  projectId: string;
}

export function Video({ projectId }: VideoProps) {
  const { isWarm, previewUrl, isBooting, error } = useSandbox(projectId);

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded">
        Error loading sandbox: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950/50 rounded-lg border border-zinc-800 overflow-hidden">
      {/* Video preview area */}
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4 mx-auto">
            <svg
              className="w-8 h-8 text-zinc-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Video icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-zinc-300 mb-2">
            Video Preview
          </h3>
          <p className="text-sm text-zinc-500 max-w-sm">
            Video preview will appear here
          </p>
        </div>
      </div>
    </div>
  );
}
