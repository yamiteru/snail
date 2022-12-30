import { authorize, handler } from "@utils";
import { date, email, object, Time } from "@snail/utils";
import { InboxService } from "@services";

export const unsend = handler(
	{
		body: object({ to: email, date }),
	},
	async ({ body, headers }) => {
		const { to, date } = await body();
		const { me } = await authorize(headers());
		const inboxService = new InboxService();

		await inboxService.drop(to, me, date);
		await inboxService.read(to, me, date, Time.minute.seconds);
	},
);
