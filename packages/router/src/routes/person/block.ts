import { blockedAdd } from "@services";
import { object, string } from "zod";
import { privateRoute } from "@utils";

export const block = privateRoute
	.input(object({ email: string().email() }))
	.mutation(
		async ({
			input: { email },
			ctx: {
				user: { email: me },
			},
		}) => {
			await blockedAdd(me, email);
		},
	);
