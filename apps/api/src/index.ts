import { Env } from "@snail/types";
import { appRouter } from "@snail/router";
import { decodeJwt, error } from "@snail/utils";

export default {
	async fetch(request: Request, env: Env) {
		const url = new URL(request.url);

		try {
			(global as any).bindings = env;

			const method = request.method;
			const bearer = request.headers.get("authorization");
			const context = {
				auth: { me: "", token: "" },
				request: { ip: request.headers.get("ip") },
				env,
			};

			if (bearer && !bearer.includes("undefined")) {
				const token = bearer.slice(7);

				try {
					const { email } = decodeJwt(token);

					context.auth.me = email as string;
					context.auth.token = token;
				} catch {
					error(true, "TOKEN_IS_INVALID", { token });
				}
			}

			const [, fn] = url.pathname.split("/");
			const handler = appRouter[fn];
			const input =
				method === "GET"
					? Object.fromEntries(url.searchParams.entries())
					: await request.json();
			const output = await handler(input, context);

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
