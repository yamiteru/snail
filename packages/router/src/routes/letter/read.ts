import { authorize, handler } from "@utils";
import { date, email, error, object, string } from "@snail/utils";
import { InboxService } from "@services";

export const read = handler(
	{
		params: object({ from: email, date }),
		output: string,
	},
	async ({ headers, params }) => {
		const { from, date } = params();
		const { me } = await authorize(headers());
		const inboxService = new InboxService();

		const letter = await inboxService.read(me, from, date);

		error(letter === null, "LETTER_DOES_NOT_EXIST", { from, to: me, date });

		await inboxService.drop(me, from, date);

		return letter as string;
	},
);
