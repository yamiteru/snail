import { letterList, tokenCreate } from "@services";
import { array, number, object, string } from "zod";
import { privateRoute } from "@utils";

export const list = privateRoute
	.output(
		object({
			items: array(
				object({
					from: string().email(),
					date: string(),
					words: number(),
					intro: string(),
				}),
			),
		}),
	)
	.mutation(
		async ({
			ctx: {
				user: { email, token },
			},
		}) => {
			const [list] = await Promise.all([
				letterList(email),
				tokenCreate(email, token),
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
