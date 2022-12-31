import { command, input, log } from "../utils";
import { StoreService } from "../services";

export const letters = command<[maybeEmail?: string]>({
	description: "List all letters from a person",
	handler: async ([maybeEmail]) => {
		const storeService = new StoreService();
		const email = maybeEmail || (await input("Email"));
		const files = await storeService.readLetters(email);

		if (files.length) {
			files.forEach(console.log);
		} else {
			log("No letters were found");
		}
	},
});
