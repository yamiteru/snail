import { letterDelete, letterRead } from "@services";
import { object, string } from "zod";
import { minute } from "@snail/utils";
import { privateRoute } from "@utils";

export const unsend = privateRoute
	.input(object({ to: string().email(), date: string() }))
	.mutation(
		async ({
			input: { to, date },
			ctx: {
				user: { email },
			},
		}) => {
			await letterDelete(to, email, date);
			await letterRead(to, email, date, minute);
		},
	);
