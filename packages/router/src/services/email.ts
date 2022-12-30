import { Singleton } from "@snail/utils";

export abstract class AbstractEmailService extends Singleton {
	constructor() {
		super("email");
	}

	abstract send(
		template: string,
		data: Record<string, unknown>,
		email: string,
	): Promise<unknown>;

	code(email: string, data: { loginCode: string }) {
		return this.send(bindings.SENDGRID_TEMPLATE_LOGIN_CODE, data, email);
	}
}

export class EmailService extends AbstractEmailService {
	send(template: string, data: Record<string, unknown>, email: string) {
		return fetch("https://api.sendgrid.com/v3/mail/send", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${bindings.SENDGRID_API}`,
			},
			body: JSON.stringify({
				from: {
					email: bindings.SENDGRID_EMAIL,
				},
				template_id: template,
				personalizations: [
					{
						to: [{ email }],
						dynamic_template_data: data,
					},
				],
			}),
		});
	}
}

const codes = new Map<string, string>();

export const getLoginCode = (email: string) => {
	const value = codes.get(email);

	codes.delete(email);

	return value;
};

export class MockEmailService extends AbstractEmailService {
	async send(_: string, data: Record<string, unknown>, email: string) {
		codes.set(email, data.loginCode as string);
	}
}
