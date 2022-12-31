import { Env } from "@snail/types";
import { router } from "@snail/router";

export default {
	async fetch(request: Request, env: Env) {
		const url = new URL(request.url);

		// request.headers.forEach(console.log);

		try {
			(global as any).bindings = env;

			const [, a, b] = url.pathname.split("/");
			const handler = (router as any)?.[a]?.[request.method]?.[b];
			const output = await (handler as any)(request, env);

			console.log(output);
			return new Response(
				JSON.stringify({
					data: output || null,
				}),
			);
		} catch (e: any) {
			console.log(e);
			return new Response(
				JSON.stringify({
					error: e,
				}),
			);
		}
	},
};
