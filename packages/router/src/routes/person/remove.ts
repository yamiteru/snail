import { authorize } from "../../utils";
import { Blacklist, Inbox, Token } from "../../controllers";
import { Handler } from "../../types";

export const remove: Handler = async ({ headers, env: { KV } }) => {
	const { me } = await authorize(headers());

	const lists = await Promise.all([
		Inbox.list(me),
		Blacklist.list(me),
		Token.list(me),
	]);

	const promises: Promise<unknown>[] = [];

	for (const list of lists) {
		const length = list.keys.length;

		for (let i = 0; i < length; ++i) {
			promises.push(KV.delete(list.keys[i].name));
		}
	}

	await Promise.all(promises);
};
