import { Env } from "@snail/types";
import { appRouter, createContext } from "@snail/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export default {
	async fetch(request: Request, env: Env) {
		(global as any).bindings = env;

		return fetchRequestHandler({
			endpoint: "/api",
			req: request,
			router: appRouter,
			createContext,
		});
	},
};
