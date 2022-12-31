import {
	authorized,
	date,
	dateKey,
	email,
	error,
	object,
	string,
} from "@snail/utils";
import { mutate } from "@utils";
import { BlockedService, InboxService } from "@services";

export const send = mutate(
	{
		context: authorized,
		input: object({ to: email, content: string }),
		output: object({ date }),
	},
	async ({ to, content }, { auth: { me } }) => {
		const blacklistService = new BlockedService();
		const inboxService = new InboxService();
		const date = dateKey();
		const letterFromToday = await inboxService.read(to, me, date);

		error(letterFromToday !== null, "OUT_OF_LETTERS", {
			from: me,
			to,
			date,
		});

		const blacklistedUser = await blacklistService.read(to, me);

		error(!!blacklistedUser, "PERSON_BLACKLISTED", {
			target: me,
			by: to,
		});

		await inboxService.create(to, me, date, content);

		return {
			date,
		};
	},
);
