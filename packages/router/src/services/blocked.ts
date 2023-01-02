import { blockedKey, year } from "@snail/utils";

export const blockedAdd = (me: string, otherPerson: string) =>
	bindings.KV.put(blockedKey(me, otherPerson), "", {
		expirationTtl: year,
	});

export const blockedDelete = (me: string, otherPerson: string) => {
	return bindings.KV.delete(blockedKey(me, otherPerson));
};

export const blockedList = (me: string) => {
	return bindings.KV.list({ prefix: blockedKey(me) });
};

export const blockedRead = (me: string, otherPerson: string) => {
	return bindings.KV.get(blockedKey(me, otherPerson), {
		cacheTtl: year,
	});
};
