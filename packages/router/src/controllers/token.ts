import { Key } from "../utils";
import { Seconds } from "@snail/utils";

export namespace Token {
	export const create = (me: string, token: string) =>
		bindings.KV.put(Key.token(me, token), "", { expirationTtl: Seconds.week });

	export const list = (me: string) =>
		bindings.KV.list({ prefix: Key.token(me) });
}
