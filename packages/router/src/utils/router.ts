import { routerFactory } from "@snail/utils";
import { Env } from "@snail/types";

type Context = {
	auth: { me: string; token: string };
	request: { ip: string };
	env: Env;
};

export const { router, query, mutate } = routerFactory<Context>();
