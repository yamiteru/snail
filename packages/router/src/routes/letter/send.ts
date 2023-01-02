import { authContext, AuthContext, mutate } from "@utils";
import { date, dateKey, email, error, object, string } from "@snail/utils";
import { blockedRead, letterCreate, letterRead } from "@services";

export const send = mutate<
	{ to: string; content: string },
	{ date: string },
	AuthContext
>({
	context: authContext,
	input: object({ to: email, content: string }),
	output: object({ date }),
	handler: async ({ to, content }, { me }) => {
		const date = dateKey();
		const letterFromToday = await letterRead(to, me, date);

		error(letterFromToday !== null, "OUT_OF_LETTERS", {
			from: me,
			to,
			date,
		});

		const blacklistedUser = await blockedRead(to, me);

		error(!!blacklistedUser, "PERSON_BLACKLISTED", {
			target: me,
			by: to,
		});

		await letterCreate(to, me, date, content);

		return {
			date,
		};
	},
});
