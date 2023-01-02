import { blockedRead, letterCreate, letterRead } from "@services";
import { object, string } from "zod";
import { dateKey, error } from "@snail/utils";
import { privateRoute } from "@utils";

export const send = privateRoute
	.input(object({ to: string().email(), content: string() }))
	.output(object({ date: string() }))
	.mutation(
		async ({
			input: { to, content },
			ctx: {
				user: { email },
			},
		}) => {
			const date = dateKey();
			const letterFromToday = await letterRead(to, email, date);

			error(letterFromToday !== null, "OUT_OF_LETTERS", {
				from: email,
				to,
				date,
			});

			const blacklistedUser = await blockedRead(to, email);

			error(!!blacklistedUser, "PERSON_BLACKLISTED", {
				target: email,
				by: to,
			});

			await letterCreate(to, email, date, content);

			return {
				date,
			};
		},
	);
