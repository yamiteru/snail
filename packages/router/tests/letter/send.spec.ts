import { beforeAll, expect, it } from "vitest";
import { call, getRandomEmailTuples, setSendEmail } from "../../src";
import { login, register } from "../../src/routes/auth";
import { Nullable } from "@snail/types";
import { send } from "../../src/routes/letter";

const codes = new Map<string, (value: string) => void>();

beforeAll(() => {
	(global as any).bindings = getMiniflareBindings();
	setSendEmail(async (_, data, email) => {
		codes.get(email)?.(data.loginCode as string);
		codes.delete(email);
	});
});

setupMiniflareIsolatedStorage()("letter/send", () => {
	it.each(getRandomEmailTuples())(
		"should send letter to another person",
		async (a, b) => {
			let loginCode: Nullable<string> = null;

			await call(register, { body: { email: a } });

			codes.set(b, (v) => (loginCode = v));

			await call(register, { body: { email: b } });

			const token = await call(login, { body: { email: a, loginCode } });

			await expect(
				call(send, {
					body: { to: a, content: "hello" },
					headers: { authorization: `Bearer ${token}` },
				}),
			).resolves.toBeDefined();
		},
	);
});
