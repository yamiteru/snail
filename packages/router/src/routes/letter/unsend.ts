import { mutate } from "@utils";
import { authorized, date, email, none, object, Time } from "@snail/utils";
import { InboxService } from "@services";

export const unsend = mutate(
	{
		context: authorized,
		input: object({ to: email, date }),
		output: none,
	},
	async ({ to, date }, { auth: { me } }) => {
		const inboxService = new InboxService();

		await inboxService.drop(to, me, date);
		await inboxService.read(to, me, date, Time.minute.seconds);
	},
);
