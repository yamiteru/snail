import { mutate } from "@utils";
import { authorized, email, none, object } from "@snail/utils";
import { BlockedService } from "@services";

export const block = mutate(
	{
		context: authorized,
		input: object({ email }),
		output: none,
	},
	async ({ email }, { auth: { me } }) => {
		const blockedService = new BlockedService();

		await blockedService.add(me, email);
	},
);
