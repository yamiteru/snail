import { authContext, AuthContext, query } from "@utils";
import { blockedList } from "@services";
import { array, object, string } from "@snail/utils";

export const blocked = query<undefined, { items: string[] }, AuthContext>({
	context: authContext,
	output: object({ items: array(string) }),
	handler: async (_, { me }) => {
		const list = await blockedList(me);
		const items = list.keys.map((v) => v.name);

		return { items };
	},
});
