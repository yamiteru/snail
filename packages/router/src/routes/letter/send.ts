import { dateKey, email, error, object, string } from "@snail/utils";
import { authorize, handler } from "@utils";
import { BlacklistService, InboxService } from "@services";

export const send = handler(
	{
		body: object({ to: email, content: string }),
	},
	async ({ body, headers }) => {
		const { to, content } = await body();
		const { me } = await authorize(headers());
		const blacklistService = new BlacklistService();
		const inboxService = new InboxService();
		const date = dateKey();
		const letterFromToday = await inboxService.read(to, me, date);

		error(letterFromToday !== null, "OUT_OF_LETTERS", { from: me, to, date });

		const blacklistedUser = await blacklistService.read(to, me);

		error(!!blacklistedUser, "PERSON_BLACKLISTED", { target: me, by: to });

		await inboxService.create(to, me, date, content);

		return date;
	},
);
