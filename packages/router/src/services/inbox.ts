import { AbstractKVService } from "./kv";
import { KV, Time } from "@snail/utils";

export class InboxService extends AbstractKVService {
	constructor() {
		super("inbox");
	}

	list(me: string) {
		return this.KV.list({ prefix: KV.key.inbox(me) });
	}

	read(
		me: string,
		otherPerson: string,
		date: string,
		cache = Time.month.seconds,
	) {
		return this.KV.get(KV.key.inbox(me, otherPerson, date), {
			cacheTtl: cache,
		});
	}

	drop(me: string, otherPerson: string, date: string) {
		return this.KV.delete(KV.key.inbox(me, otherPerson, date));
	}

	create(me: string, otherPerson: string, date: string, content: string) {
		return this.KV.put(KV.key.inbox(me, otherPerson, date), content, {
			expirationTtl: Time.month.seconds,
			metadata: {
				w: content.split(" ").length,
				i: `${content.slice(0, 117).trimEnd()} ..`,
			},
		});
	}
}
