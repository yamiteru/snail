import { beforeAll, expect, it } from "vitest";
import { call, getRandomEmailTuples, setSendEmail } from "../../src";
import { Nullable } from "@snail/types";
import { login, register } from "../../src/routes/auth";
import { blacklist } from "../../src/routes/person";

const codes = new Map<string, (value: string) => void>();

beforeAll(() => {
	(global as any).bindings = getMiniflareBindings();
	setSendEmail(async (_, data, email) => {
		codes.get(email)?.(data.loginCode as string);
		codes.delete(email);
	});
});

setupMiniflareIsolatedStorage()("person/blacklist", () => {
	it.each(getRandomEmailTuples())("should blacklist a person", async (a, b) => {
		let loginCode: Nullable<string> = null;

		await call(register, { body: { email: a } });

		codes.set(b, (v) => (loginCode = v));

		await call(register, { body: { email: b } });

		const token = await call(login, { body: { email: b, loginCode } });

		await expect(
			call(blacklist, {
				body: { email: a },
				headers: { authorization: `Bearer ${token}` },
			}),
		).resolves.toBe(undefined);
	});
});
