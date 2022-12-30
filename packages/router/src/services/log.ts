import { Singleton } from "@snail/utils";

export abstract class AbstractLogService extends Singleton {
	constructor() {
		super("log");
	}

	info(value: unknown) {
		return this.send("INFO", value);
	}

	error(value: Record<string, unknown>) {
		return this.send("ERROR", value);
	}

	protected abstract send(label: string, value: unknown): Promise<unknown>;
}
export class LogService extends AbstractLogService {
	protected send(label: string, value: unknown) {
		return fetch(`/loki/api/v1/push`, {
			body: JSON.stringify({
				streams: [
					{
						stream: {
							label,
						},
						values: [
							[
								(new Date().getTime() * 1000000).toString(),
								JSON.stringify(value),
							],
						],
					},
				],
			}),
			method: "POST",
			headers: {
				Authorization: `Bearer`,
				"Content-Type": "application/json",
			},
		});
	}
}
