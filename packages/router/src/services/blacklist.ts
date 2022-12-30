import { AbstractKVService } from "./kv";
import { KV, Time } from "@snail/utils";

export class BlacklistService extends AbstractKVService {
	constructor() {
		super("blacklist");
	}

	add(me: string, otherPerson: string) {
		return this.KV.put(KV.key.blacklist(me, otherPerson), "", {
			expirationTtl: Time.year.seconds,
		});
	}

	remove(me: string, otherPerson: string) {
		return this.KV.delete(KV.key.blacklist(me, otherPerson));
	}

	list(me: string) {
		return this.KV.list({ prefix: KV.key.blacklist(me) });
	}

	read(me: string, otherPerson: string) {
		return this.KV.get(KV.key.blacklist(me, otherPerson), {
			cacheTtl: Time.year.seconds,
		});
	}
}
