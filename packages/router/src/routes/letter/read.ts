import { authContext, AuthContext, query } from "@utils";
import { date, email, error, object, string } from "@snail/utils";
import { letterDelete, letterRead } from "@services";

export const read = query<
	{ from: string; date: string },
	{ content: string },
	AuthContext
>({
	context: authContext,
	input: object({ from: email, date }),
	output: object({ content: string }),
	handler: async ({ from, date }, { me }) => {
		const content = await letterRead(me, from, date);

		error(content === null, "LETTER_DOES_NOT_EXIST", {
			from,
			to: me,
			date,
		});

		await letterDelete(me, from, date);

		return {
			content: content as string,
		};
	},
});
