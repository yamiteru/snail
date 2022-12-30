import { Env } from "@snail/types";
import { getHeaders, getParams, Type } from "@snail/utils";

export type Options<B, P> = {
	body: () => Promise<B>;
	params: () => P;
	headers: () => Record<string, string>;
	env: Env;
};

export type Validations<B, P, O> = {
	body?: Type<B>;
	params?: Type<P>;
	output?: Type<O>;
};

export type Handler<B, P, O> = (options: Options<B, P>) => Promise<O>;

export const handler =
	<B, P, O>(validation: Validations<B, P, O>, handler: Handler<B, P, O>) =>
	async (req: Request, env: Env) => {
		const response = await handler({
			body: async () => {
				const body = await req.json();

				validation.body?.(body);

				return body as B;
			},
			params: () => {
				const params = getParams(req.url);

				validation.params?.(params as P);

				return params as P;
			},
			headers: () => getHeaders(req),
			env,
		});

		validation.output?.(response);

		return response;
	};
