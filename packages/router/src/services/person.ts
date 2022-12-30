import { AbstractKVService } from "./kv";
import { KV, Time } from "@snail/utils";

export class PersonService extends AbstractKVService {
	constructor() {
		super("person");
	}

	create(me: string) {
		return this.KV.put(KV.key.person(me), "", { metadata: { c: Date.now() } });
	}

	read(me: string, cache = Time.year.seconds) {
		return this.KV.get(KV.key.person(me), { cacheTtl: cache });
	}

	upsert(me: string, secret: string) {
		return this.KV.put(KV.key.person(me), secret);
	}

	drop(me: string) {
		return this.KV.delete(KV.key.person(me));
	}
}
