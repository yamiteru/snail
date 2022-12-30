import { beforeAll, beforeEach, it } from "vitest";
import { getRandomEmails, setSendEmail } from "../../src";

const codes = new Map<string, (value: string) => void>();

beforeAll(() => {
	(global as any).bindings = getMiniflareBindings();
	setSendEmail(async (_, data, email) => {
		codes.get(email)?.(data.loginCode as string);
		codes.delete(email);
	});
});

setupMiniflareIsolatedStorage().each(getRandomEmails())(
	"letter/list",
	(email) => {
		beforeEach(async () => {});

		it("should list all letters inside inbox", async () => {});
	},
);
