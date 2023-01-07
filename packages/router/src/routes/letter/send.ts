import { blockedRead, letterCreate, letterRead } from "@services";
import { object, string } from "zod";
import { dateKey } from "@snail/utils";
import { privateRoute } from "@utils";
import { TRPCError } from "@trpc/server";

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

			if (letterFromToday !== null) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Out of letters",
				});
			}

			const blacklistedUser = await blockedRead(to, email);

			if (blacklistedUser) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Person blacklisted",
				});
			}

			await letterCreate(to, email, date, content);

			return {
				date,
			};
		},
	);
