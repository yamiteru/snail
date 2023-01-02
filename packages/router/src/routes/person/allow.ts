import { AuthContext, authContext, mutate } from "@utils";
import { blockedDelete } from "@services";
import { email, object } from "@snail/utils";

export const allow = mutate<{ email: string }, void, AuthContext>({
	context: authContext,
	input: object({ email }),
	handler: async ({ email }, { me }) => {
		await blockedDelete(me, email);
	},
});
