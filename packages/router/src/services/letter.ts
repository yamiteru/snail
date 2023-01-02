import { inboxKey, month } from "@snail/utils";

export const letterList = (me: string) =>
	bindings.KV.list({ prefix: inboxKey(me) });

export const letterRead = (
	me: string,
	otherPerson: string,
	date: string,
	cache = month,
) =>
	bindings.KV.get(inboxKey(me, otherPerson, date), {
		cacheTtl: cache,
	});

export const letterDelete = (me: string, otherPerson: string, date: string) =>
	bindings.KV.delete(inboxKey(me, otherPerson, date));

export const letterCreate = (
	me: string,
	otherPerson: string,
	date: string,
	content: string,
) =>
	bindings.KV.put(inboxKey(me, otherPerson, date), content, {
		expirationTtl: month,
		metadata: {
			w: content.split(" ").length,
			i: `${content.slice(0, 117).trimEnd()} ..`,
		},
	});
