import { Env } from "@snail/types";
import { router } from "@snail/router";
import { LogService } from "@snail/router/src/services/log";

export default {
	async fetch(request: Request, env: Env) {
		const logService = new LogService();
		const url = new URL(request.url);

		try {
			(global as any).bindings = env;

			const [, a, b] = url.pathname.split("/");
			const handler = (router as any)?.[a]?.[request.method]?.[b];
			const output = await (handler as any)(request, env);

			const x = await logService.info(output);

			console.log(x);

			return new Response(
				JSON.stringify({
					data: output || null,
				}),
			);
		} catch (e: any) {
			const x = await logService.error(e);

			console.log(x);

			return new Response(
				JSON.stringify({
					error: e,
				}),
			);
		}
	},
};
