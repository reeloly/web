import { clerkMiddleware } from "@clerk/tanstack-react-start/server";
import { createStart } from "@tanstack/react-start";

export const startInstance = createStart(() => {
  // TODO: Remove "srvx": "0.8.15" in package.json when clerk fixes the issue
  // https://github.com/clerk/javascript/issues/6996
  return {
    requestMiddleware: [clerkMiddleware()],
  };
});
