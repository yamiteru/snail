import { Env } from "@snail/types";
import { Handler } from "../types";

export const call = (
	handler: Handler,
	options: {
		body?: Record<string, unknown>;
		params?: Record<string, string>;
		headers?: Record<string, string>;
		env?: Env;
	},
) =>
	handler({
		body: async () => options.body || {},
		params: () => options.params || {},
		headers: () => options.headers || {},
		env: options.env || bindings,
	});
