import { beforeAll, expect, it, Nullable } from "vitest";
import { call, getRandomEmails, getRandomNames, setSendEmail } from "../../src";
import { code, register } from "../../src/routes/auth";

const codes = new Map<string, (value: string) => void>();

beforeAll(() => {
	(global as any).bindings = getMiniflareBindings();
	setSendEmail(async (_, data, email) => {
		codes.get(email)?.(data.loginCode as string);
		codes.delete(email);
	});
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
