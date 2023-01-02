import { tokenKey, week } from "@snail/utils";

export const tokenCreate = (me: string, token: string) =>
	bindings.KV.put(tokenKey(me, token), "", {
		expirationTtl: week,
	});

export const tokenList = (me: string) =>
	bindings.KV.list({ prefix: tokenKey(me) });
