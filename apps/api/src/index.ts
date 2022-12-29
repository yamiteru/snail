import { Env } from "@snail/types";
import { router } from "@snail/router";
import { getHeaders, searchParams } from "@snail/utils";

export default {
	async fetch(request: Request, env: Env) {
		const url = new URL(request.url);

		try {
			(global as any).bindings = env;

			const [, a, b] = url.pathname.split("/");
			const handler = (router as any)?.[a]?.[request.method]?.[b];
			const output = await (handler as any)({
				body: request.json,
				params: () => searchParams(request.url),
				headers: () => getHeaders(request),
				env,
			});

			return new Response(
				JSON.stringify({
					data: output || null,
				}),
			);
		} catch (e: any) {
			return new Response(
				JSON.stringify({
					error: e,
				}),
			);
		}
	},
};
