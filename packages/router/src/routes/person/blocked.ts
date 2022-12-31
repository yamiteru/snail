import { query } from "@utils";
import { array, authorized, none, object, string } from "@snail/utils";
import { BlockedService } from "@services";

export const blocked = query(
	{
		context: authorized,
		input: none,
		output: object({ items: array(string) }),
	},
	async (_, { auth: { me } }) => {
		const blockedService = new BlockedService();
		const list = await blockedService.list(me);
		const items = list.keys.map((v) => v.name);

		return { items };
	},
);
