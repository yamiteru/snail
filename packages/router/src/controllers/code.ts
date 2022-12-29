import { Key } from "../utils";
import { Seconds } from "@snail/utils";

export namespace Code {
	export const create = (me: string, code: string) =>
		bindings.KV.put(Key.code(me), code, { expirationTtl: Seconds.minute * 5 });

	export const read = (me: string) => bindings.KV.get(Key.code(me));

	export const drop = (me: string) => bindings.KV.delete(Key.code(me));
}
