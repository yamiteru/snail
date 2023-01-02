import { authContext, AuthContext, mutate } from "@utils";
import { blockedAdd } from "@services";
import { email, object } from "@snail/utils";

export const block = mutate<{ email: string }, void, AuthContext>({
	context: authContext,
	input: object({ email }),
	handler: async ({ email }, { me }) => {
		await blockedAdd(me, email);
	},
});
