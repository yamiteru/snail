import { StoreService } from "../services";
import { command, log } from "../utils";

export const logout = command({
	description: "Logs you out",
	handler: async () => {
		const storeService = new StoreService();
		await storeService.upsertCustomConfig({ email: null, token: null });

		log("You have been logged out");
	},
});
