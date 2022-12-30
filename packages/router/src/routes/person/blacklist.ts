import { authorize, handler } from "@utils";
import { email, object } from "@snail/utils";
import { BlacklistService } from "@services";

export const blacklist = handler(
	{
		body: object({ email }),
	},
	async ({ body, headers }) => {
		const { email } = await body();
		const { me } = await authorize(headers());
		const blacklistService = new BlacklistService();

		await blacklistService.add(me, email);
	},
);
