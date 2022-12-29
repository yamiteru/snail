import { beforeAll, expect, it } from "vitest";
import { call, getRandomEmails, getRandomNames, setSendEmail } from "../../src";
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

setupMiniflareIsolatedStorage()("auth/login", () => {
	it.each(getRandomEmails())(
		"should generate code for existing person",
		async (email) => {
			let loginCode: Nullable<string> = null;

			codes.set(email, (v) => (loginCode = v));

			await call(register, { body: { email } });
			await expect(
				call(login, { body: { email, loginCode } }),
			).resolves.toBeTypeOf("string");
		},
	);

	it.each(getRandomEmails())(
		"should reject on non-existent email",
		async (email) => {
			await expect(
				call(login, { body: { email, loginCode: "______" } }),
			).rejects.toBeDefined();
		},
	);

	it.each(getRandomEmails())(
		"should reject on non-matching login code",
		async (email) => {
			await call(register, { body: { email } });
			await expect(
				call(login, { body: { email, loginCode: "______" } }),
			).rejects.toBeDefined();
		},
	);

	it.each(getRandomNames())("should reject on invalid email", async (email) => {
		await expect(
			call(login, { body: { email, loginCode: "______" } }),
		).rejects.toBeDefined();
	});

	it.each(getRandomEmails())(
		"should reject on invalid login code",
		async (email) => {
			await call(register, { body: { email } });
			await expect(
				call(login, { body: { email, loginCode: "__" } }),
			).rejects.toBeDefined();
		},
	);
});
