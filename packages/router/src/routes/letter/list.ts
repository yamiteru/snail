import { authorize, handler } from "@utils";
import { array, date, email, number, object, string } from "@snail/utils";
import { InboxService, TokenService } from "@services";

export const list = handler(
	{
		output: array(
			object({
				from: email,
				date,
				words: number,
				intro: string,
			}),
		),
	},
	async ({ headers }) => {
		const { me, token } = await authorize(headers());
		const inboxService = new InboxService();
		const tokenService = new TokenService();
		const [list] = await Promise.all([
			inboxService.list(me),
			tokenService.create(me, token),
		]);
		const length = list.keys.length;
		const res = [];

		for (let i = 0; i < length; ++i) {
			const { name, metadata } = list.keys[i];
			const key = name.split(":");
			const from = key[2];
			const date = key[3];
			const words = (metadata as any)?.w;
			const intro = (metadata as any)?.i;

			res.push({
				from,
				date,
				words,
				intro,
			});
		}

		return res;
	},
);
