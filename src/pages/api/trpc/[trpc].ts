import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "@tv4/env";
import { appRouter } from "@tv4/server/api/root";
import { createTRPCContext } from "@tv4/server/api/trpc";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
