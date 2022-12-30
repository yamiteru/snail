import { Singleton } from "@snail/utils";
import { KVNamespace } from "@miniflare/kv";

export abstract class AbstractKVService extends Singleton {
	protected KV: KVNamespace;

	protected constructor(key: string) {
		super(`kv-${key}`);
		this.KV = bindings.KV;
	}
}
