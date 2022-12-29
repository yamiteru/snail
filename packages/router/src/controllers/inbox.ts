import { Key } from "../utils";
import { Seconds } from "@snail/utils";

export namespace Inbox {
	export const list = (me: string) =>
		bindings.KV.list({ prefix: Key.inbox(me) });

	export const read = (
		me: string,
		otherPerson: string,
		date: string,
		cache = Seconds.month,
	) =>
		bindings.KV.get(Key.inbox(me, otherPerson, date), {
			cacheTtl: cache,
		});

	export const drop = (me: string, otherPerson: string, date: string) =>
		bindings.KV.delete(Key.inbox(me, otherPerson, date));

	export const create = (
		me: string,
		otherPerson: string,
		date: string,
		content: string,
	) =>
		bindings.KV.put(Key.inbox(me, otherPerson, date), content, {
			expirationTtl: Seconds.month,
			metadata: {
				w: content.split(" ").length,
				i: `${content.slice(0, 117).trimEnd()} ..`,
			},
		});
}
