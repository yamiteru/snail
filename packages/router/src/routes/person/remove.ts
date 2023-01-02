import { blockedList, letterList, personDelete, tokenList } from "@services";
import { privateRoute } from "@utils";

export const remove = privateRoute.mutation(
	async ({
		ctx: {
			user: { email },
		},
	}) => {
		console.log("H", { email });
		const lists = await Promise.all([
			letterList(email),
			blockedList(email),
			tokenList(email),
		]);

		const promises: Promise<unknown>[] = [personDelete(email)];

		for (const list of lists) {
			const length = list.keys.length;

			for (let i = 0; i < length; ++i) {
				promises.push(bindings.KV.delete(list.keys[i].name));
			}
		}

		await Promise.all(promises);
	},
);
