import { beforeAll, expect, it } from "vitest";
import { faker } from "@faker-js/faker";
import { appRouter } from "../src";
import { getLoginCode, MockEmailService } from "@services";

const defaultContext = {
	ip: "0",
	user: { email: "", token: "" },
};

beforeAll(() => {
	(global as any).bindings = getMiniflareBindings();
	new MockEmailService();
});

setupMiniflareIsolatedStorage().each(
	[...new Array(10)].map(() => [
		faker.internet.email(),
		faker.internet.email(),
	]),
)("Will rename later", (a, b) => {
	it("should do all tests in one test (very professional btw)", async () => {
		const caller = appRouter.createCaller(defaultContext);

		await expect(caller["auth-register"]({ email: a })).resolves.toBe(
			undefined,
		);

		await expect(caller["auth-register"]({ email: b })).resolves.toBe(
			undefined,
		);

		const aLoginCode = getLoginCode(a);
		const bLoginCode = getLoginCode(b);

		expect(aLoginCode).toBeDefined();
		expect(bLoginCode).toBeDefined();

		const aToken = (
			await caller["auth-login"]({ email: a, loginCode: aLoginCode as string })
		).token;

		const bToken = (
			await caller["auth-login"]({ email: b, loginCode: bLoginCode as string })
		).token;

		expect(aToken).toBeDefined();
		expect(bToken).toBeDefined();

		const aCaller = appRouter.createCaller({
			ip: "0",
			user: { email: a, token: aToken },
		});

		const bCaller = appRouter.createCaller({
			ip: "0",
			user: { email: b, token: bToken },
		});

		const aDate = (await aCaller["letter-send"]({ to: b, content: "hello" }))
			.date;
		const bDate = (await bCaller["letter-send"]({ to: a, content: "hello" }))
			.date;

		expect(aDate).toBeDefined();
		expect(bDate).toBeDefined();

		const aContent = await aCaller["letter-read"]({ from: b, date: bDate });
		const bContent = await bCaller["letter-read"]({ from: a, date: aDate });

		expect(aContent).toBeDefined();
		expect(bContent).toBeDefined();

		await expect(
			aCaller["letter-send"]({ to: b, content: "hello" }),
		).rejects.toBeDefined();

		await expect(
			bCaller["letter-send"]({ to: a, content: "hello" }),
		).rejects.toBeDefined();
	});
});
