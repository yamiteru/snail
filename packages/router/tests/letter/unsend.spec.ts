import { beforeAll, expect, it } from "vitest";
import { call, getRandomEmailTuples, setSendEmail } from "../../src";
import { login, register } from "../../src/routes/auth";
import { send, unsend } from "../../src/routes/letter";
import { Nullable } from "@snail/types";

const codes = new Map<string, (value: string) => void>();

beforeAll(() => {
	(global as any).bindings = getMiniflareBindings();
	setSendEmail(async (_, data, email) => {
		codes.get(email)?.(data.loginCode as string);
		codes.delete(email);
	});
});

setupMiniflareIsolatedStorage()("letter/unsend", () => {
	it.each(getRandomEmailTuples())(
		"should remove letter from persons inbox",
		async (a, b) => {
			let loginCode: Nullable<string> = null;

			await call(register, { body: { email: a } });

			codes.set(b, (v) => (loginCode = v));

			await call(register, { body: { email: b } });

			const token = await call(login, { body: { email: a, loginCode } });

			const date = await call(send, {
				body: { to: a, content: "hello" },
				headers: { authorization: `Bearer ${token}` },
			});

			await expect(
				call(unsend, {
					body: { to: a, date },
					headers: { authorization: `Bearer ${token}` },
				}),
			).resolves.toBeDefined();
		},
	);
});
