import { Env } from "@snail/types";

export type Handler = (options: {
	body: () => Promise<any>;
	params: () => Record<string, string>;
	headers: () => Record<string, string>;
	env: Env;
}) => Promise<any>;
