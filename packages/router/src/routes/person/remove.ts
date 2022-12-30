import { authorize, handler } from "@utils";
import { BlacklistService, InboxService, TokenService } from "@services";

export const remove = handler({}, async ({ headers, env: { KV } }) => {
	const { me } = await authorize(headers());
	const inboxService = new InboxService();
	const blackboxService = new BlacklistService();
	const tokenService = new TokenService();

	const lists = await Promise.all([
		inboxService.list(me),
		blackboxService.list(me),
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
});
