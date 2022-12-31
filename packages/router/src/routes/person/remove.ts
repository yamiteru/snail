import { mutate } from "@utils";
import { BlockedService, InboxService, TokenService } from "@services";
import { authorized, none } from "@snail/utils";

export const remove = mutate(
	{
		context: authorized,
		input: none,
		output: none,
	},
	async (_, { auth: { me }, env: { KV } }) => {
		const inboxService = new InboxService();
		const blockedService = new BlockedService();
		const tokenService = new TokenService();

		const lists = await Promise.all([
			inboxService.list(me),
			blockedService.list(me),
			tokenService.list(me),
		]);

		const promises: Promise<unknown>[] = [];

		for (const list of lists) {
			const length = list.keys.length;

			for (let i = 0; i < length; ++i) {
				promises.push(KV.delete(list.keys[i].name));
			}
		}

		await Promise.all(promises);
	},
);
