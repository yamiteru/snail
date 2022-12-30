import { AbstractKVService } from "./kv";
import { KV, Time } from "@snail/utils";

export class CodeService extends AbstractKVService {
	constructor() {
		super("code");
	}

	create(me: string, code: string) {
		return this.KV.put(KV.key.code(me), code, {
			expirationTtl: Time.minute.seconds * 5,
		});
	}

	read(me: string) {
		return this.KV.get(KV.key.code(me));
	}

	drop(me: string) {
		return this.KV.delete(KV.key.code(me));
	}
}
