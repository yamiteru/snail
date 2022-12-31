import { command, input, log } from "../utils";
import { StoreService } from "../services";

export const setup = command<[maybeCustomConfig?: string]>({
	description: "Sets up the app",
	handler: async ([maybeCustomConfig]) => {
		const storeService = new StoreService();
		const customConfig = maybeCustomConfig || (await input("Letter folder"));

		await storeService.upsertMainConfig({ customConfig });

		log("Snail has been set up");
	},
});
