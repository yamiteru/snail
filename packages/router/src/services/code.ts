import { codeKey, minute } from "@snail/utils";

export const codeCreate = (me: string, code: string) =>
	bindings.KV.put(codeKey(me), code, {
		expirationTtl: minute * 5,
	});

export const codeRead = (me: string) => bindings.KV.get(codeKey(me));

export const codeDelete = (me: string) => bindings.KV.delete(codeKey(me));
