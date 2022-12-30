import { beforeAll, expect, it, Nullable } from "vitest";
import { call, getRandomEmails, getRandomNames } from "../../src";
import { code, register } from "../../src/routes/auth";
import { MockEmail } from "../../src/services/email";

const codes = new Map<string, (value: string) => void>();

beforeAll(() => {
	(global as any).bindings = getMiniflareBindings();
	new MockEmail();
});

setupMiniflareIsolatedStorage()("auth/code", () => {
	it.each(getRandomEmails())(
		"should generate code for existing person",
		async (email) => {
			let loginCode: Nullable<string> = null;

			await call(register, { body: { email } });

			codes.set(email, (v) => (loginCode = v));

			await call(code, { body: { email } });

			expect(loginCode).toBeTruthy();
			expect(loginCode).toBeTypeOf("string");
			expect((loginCode as unknown as string).length).toBe(6);
		},
	);

	it.each(getRandomEmails())(
		"should reject on non-existent email",
		async (email) => {
			await expect(call(code, { body: { email } })).rejects.toBeDefined();
		},
	);

	it.each(getRandomNames())("should reject on invalid email", async (email) => {
		await expect(call(code, { body: { email } })).rejects.toBeDefined();
	});
});
