import { AuthContext, authContext, mutate } from "@utils";
import { date, email, minute, object } from "@snail/utils";
import { letterDelete, letterRead } from "@services";

export const unsend = mutate<{ to: string; date: string }, void, AuthContext>({
	context: authContext,
	input: object({ to: email, date }),
	handler: async ({ to, date }, { me }) => {
		await letterDelete(to, me, date);
		await letterRead(to, me, date, minute);
	},
});
