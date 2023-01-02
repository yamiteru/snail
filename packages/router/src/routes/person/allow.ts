import { blockedDelete } from "@services";
import { object, string } from "zod";
import { privateRoute } from "@utils";

export const allow = privateRoute
	.input(object({ email: string().email() }))
	.mutation(
		async ({
			input: { email },
			ctx: {
				user: { email: me },
			},
		}) => {
			await blockedDelete(me, email);
		},
	);
