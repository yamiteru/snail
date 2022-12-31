import { query } from "@utils";
import { authorized, date, email, error, object, string } from "@snail/utils";
import { InboxService } from "@services";

export const read = query(
	{
		context: authorized,
		input: object({ from: email, date }),
		output: object({ content: string }),
	},
	async ({ from, date }, { auth: { me } }) => {
		const inboxService = new InboxService();

		const content = await inboxService.read(me, from, date);

		error(content === null, "LETTER_DOES_NOT_EXIST", {
			from,
			to: me,
			date,
		});

		await inboxService.drop(me, from, date);

		return {
			content: content as string,
		};
	},
);
