import { query } from "@utils";
import {
	array,
	authorized,
	date,
	email,
	none,
	number,
	object,
	string,
} from "@snail/utils";
import { InboxService, TokenService } from "@services";

export const list = query(
	{
		context: authorized,
		input: none,
		output: object({
			items: array(
				object({
					from: email,
					date,
					words: number,
					intro: string,
				}),
			),
		}),
	},
	async (_, { auth: { me, token } }) => {
		const inboxService = new InboxService();
		const tokenService = new TokenService();
		const [list] = await Promise.all([
			inboxService.list(me),
			tokenService.create(me, token),
		]);
		const length = list.keys.length;
		const items = [];

		for (let i = 0; i < length; ++i) {
			const { name, metadata } = list.keys[i];
			const key = name.split(":");
			const from = key[2];
			const date = key[3];
			const words = (metadata as any)?.w;
			const intro = (metadata as any)?.i;

			items.push({
				from,
				date,
				words,
				intro,
			});
		}

		return { items };
	},
);
