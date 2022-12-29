import { Key } from "../utils";
import { Seconds } from "@snail/utils";

export namespace Blacklist {
	export const add = (me: string, otherPerson: string) =>
		bindings.KV.put(Key.blacklist(me, otherPerson), "", {
			expirationTtl: Seconds.year,
		});

	export const remove = (me: string, otherPerson: string) =>
		bindings.KV.delete(Key.blacklist(me, otherPerson));

	export const list = (me: string) =>
		bindings.KV.list({ prefix: Key.blacklist(me) });

	export const read = (me: string, otherPerson: string) =>
		bindings.KV.get(Key.blacklist(me, otherPerson), { cacheTtl: Seconds.year });
}
