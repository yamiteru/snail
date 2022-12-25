import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "@app";
import { router } from "@router";

export default {
  async fetch(request: Request) {
    return fetchRequestHandler({
      endpoint: "/api",
      req: request,
      router,
      createContext,
    });
  },
};
