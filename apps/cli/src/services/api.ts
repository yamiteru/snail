import { Singleton } from "@snail/utils";
import fetch from "node-fetch";
import { StoreService } from "./store";

export class ApiService extends Singleton {
	constructor() {
		super("api");
	}

	register(email: string) {
		return this.send("POST", "auth/register", { email });
	}

	login(email: string, loginCode: string) {
		return this.send("POST", "auth/login", { email, loginCode });
	}

	code(email: string) {
		return this.send("POST", "auth/code", { email });
	}

	allow(email: string) {
		return this.send("POST", "person/whitelist", { email });
	}

	block(email: string) {
		return this.send("POST", "person/blacklist", { email });
	}

	blocked() {
		return this.send("GET", "person/blocked");
	}

	inbox(email: string) {
		return this.send("GET", `letter/inbox?email=${email}`);
	}

	letterSend(to: string, content: string) {
		return this.send("POST", "letter/one", { to, content });
	}

	letterUnsend(to: string, date: string) {
		return this.send("DELETE", "letter/one", { to, date });
	}

	letterRead(from: string, date: string) {
		return this.send("GET", `letter/one?from=${from}&date=${date}`);
	}

	private async send(
		method: string,
		url: string,
		data?: unknown,
	): Promise<
		{ data: unknown } | { error: { reason: string; [key: string]: unknown } }
	> {
		const storeService = new StoreService();
		const { token } = await storeService.readCustomConfig();

		const response = await fetch(`${process.env.API_URL}/${url}`, {
			method,
			...(data && method !== "GET" ? { body: JSON.stringify(data) } : {}),
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		return (await response.json()) as any;
	}
}
