import { letterDelete, letterRead } from "@services";
import { object, string } from "zod";
import { error } from "@snail/utils";
import { privateRoute } from "@utils";

export const read = privateRoute
	.input(object({ from: string().email(), date: string() }))
	.output(object({ content: string() }))
	.query(
		async ({
			input: { from, date },
			ctx: {
				user: { email },
			},
		}) => {
			const content = await letterRead(email, from, date);

			error(content === null, "LETTER_DOES_NOT_EXIST", {
				from,
				to: email,
				date,
			});

			await letterDelete(email, from, date);

			return {
				content: content as string,
			};
		},
	);
