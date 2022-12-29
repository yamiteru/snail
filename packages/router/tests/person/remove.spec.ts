import { beforeAll, expect, it } from "vitest";
import { call, getRandomEmails, getRandomNames, setSendEmail } from "../../src";
import { remove } from "../../src/routes/person";
import { login, register } from "../../src/routes/auth";
import { Nullable } from "@snail/types";

const codes = new Map<string, (value: string) => void>();

beforeAll(() => {
	(global as any).bindings = getMiniflareBindings();
	setSendEmail(async (_, data, email) => {
		codes.get(email)?.(data.loginCode as string);
		codes.delete(email);
	});
});

setupMiniflareIsolatedStorage()("person/remove", () => {
	it.each(getRandomEmails())(
		"should remove person from database",
		async (email) => {
			let loginCode: Nullable<string> = null;

			codes.set(email, (v) => (loginCode = v));

			await call(register, { body: { email } });

			const token = await call(login, { body: { email, loginCode } });

			await expect(
				call(remove, { headers: { authorization: `Bearer ${token}` } }),
			).resolves.toBe(undefined);
		},
	);

	it.each(getRandomNames())("should reject on no token", async () => {
		await expect(call(remove, {})).rejects.toBeDefined();
	});

	it.each(getRandomNames())("should reject on invalid token", async (email) => {
		await expect(
			call(remove, { headers: { authorization: email } }),
		).rejects.toBeDefined();
	});
});
