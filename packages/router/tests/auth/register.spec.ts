import { beforeAll, expect, it } from "vitest";
import { noopP } from "@snail/utils";
import { call, getRandomEmails, setSendEmail } from "../../src";
import { register } from "../../src/routes/auth";

beforeAll(() => {
	(global as any).bindings = getMiniflareBindings();
	setSendEmail(noopP);
});

setupMiniflareIsolatedStorage()("auth/register", () => {
	it.each(getRandomEmails())("should register a new person", async (email) => {
		await expect(call(register, { body: { email } })).resolves.toBe(undefined);
	});

	it.each(getRandomEmails())(
		"should reject on duplicate email",
		async (email) => {
			await call(register, { body: { email } });
			await expect(call(register, { body: { email } })).rejects.toBeDefined();
		},
	);
});
