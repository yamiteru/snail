import { authContext, AuthContext, query } from "@utils";
import { array, date, email, number, object, string } from "@snail/utils";
import { letterList, tokenCreate } from "@services";

export const list = query<
	undefined,
	{ items: { from: string; date: string; words: number; intro: string }[] },
	AuthContext
>({
	context: authContext,
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
	handler: async (_, { me, token }) => {
		const [list] = await Promise.all([letterList(me), tokenCreate(me, token)]);

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
});
