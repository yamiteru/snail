import { authContext, AuthContext, mutate } from "@utils";
import { blockedList, letterList, personDelete, tokenList } from "@services";

export const remove = mutate<undefined, void, AuthContext>({
	context: authContext,
	handler: async (_, { me }) => {
		const lists = await Promise.all([
			letterList(me),
			blockedList(me),
			tokenList(me),
		]);

		const promises: Promise<unknown>[] = [personDelete(me)];

		for (const list of lists) {
			const length = list.keys.length;

			for (let i = 0; i < length; ++i) {
				promises.push(bindings.KV.delete(list.keys[i].name));
			}
		}

		await Promise.all(promises);
	},
});
