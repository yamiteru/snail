import { authorize, handler } from "@utils";
import { array, string } from "@snail/utils";
import { BlacklistService } from "@services";

export const blocked = handler(
	{
		output: array(string),
	},
	async ({ headers }) => {
		const { me } = await authorize(headers());
		const blacklistService = new BlacklistService();

		return (await blacklistService.list(me)).keys.map((v) => v.name);
	},
);
