import { Env } from "@snail/types";
import { appRouter } from "@snail/router";
import { call } from "@snail/router/src/utils";

export default {
	async fetch(request: Request, env: Env) {
		const url = new URL(request.url);

		try {
			(global as any).bindings = env;

			const [, fn] = url.pathname.split("/");
			const output = await call(appRouter[fn], request);

			console.log(output);
			return new Response(
				JSON.stringify({
					data: output,
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
