import { blockedList } from "@services";
import { array, object, string } from "zod";
import { privateRoute } from "@utils";

export const blocked = privateRoute
	.output(object({ items: array(string()) }))
	.query(
		async ({
			ctx: {
				user: { email },
			},
		}) => {
			const list = await blockedList(email);
			const items = list.keys.map((v) => v.name);

			return { items };
		},
	);
