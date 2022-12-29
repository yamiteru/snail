import { Key } from "../utils";
import { Seconds } from "@snail/utils";

export namespace Person {
	export const create = (me: string) =>
		bindings.KV.put(Key.person(me), "", { metadata: { c: Date.now() } });

	export const read = (me: string, cache = Seconds.year) =>
		bindings.KV.get(Key.person(me), { cacheTtl: cache });

	export const upsert = (me: string, secret: string) =>
		bindings.KV.put(Key.person(me), secret);

	export const drop = (me: string) => bindings.KV.delete(Key.person(me));
}
