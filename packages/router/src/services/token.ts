import { AbstractKVService } from "./kv";
import { KV, Time } from "@snail/utils";

export class TokenService extends AbstractKVService {
	constructor() {
		super("token");
	}

	create(me: string, token: string) {
		return this.KV.put(KV.key.token(me, token), "", {
			expirationTtl: Time.week.seconds,
		});
	}

	list(me: string) {
		return this.KV.list({ prefix: KV.key.token(me) });
	}
}
