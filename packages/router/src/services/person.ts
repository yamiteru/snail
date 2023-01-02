import { personKey, year } from "@snail/utils";

export const personCreate = (me: string) =>
	bindings.KV.put(personKey(me), "", { metadata: { c: Date.now() } });

export const personRead = (me: string, cache = year) =>
	bindings.KV.get(personKey(me), { cacheTtl: cache });

export const personUpsert = (me: string, secret: string) =>
	bindings.KV.put(personKey(me), secret);

export const personDelete = (me: string) => bindings.KV.delete(personKey(me));
