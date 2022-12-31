import { command, error, input, log } from "../utils";
import { ApiService, StoreService } from "../services";

export const send = command<[maybeEmail?: string, maybeFile?: string]>({
	description: "Sends a letter",
	handler: async ([maybeEmail, maybeFile]) => {
		const storeService = new StoreService();
		const apiService = new ApiService();
		const email = maybeEmail || (await input("Email"));
		const file = maybeFile || (await input("File"));
		const { email: me } = await storeService.readCustomConfig();
		const response = await apiService.letterSend(email, file);

		if ("error" in response) {
			return error(response.error as any);
		}

		await storeService.createLetter(
			me as string,
			response.data as string,
			file,
		);

		log("Letter has been send");
	},
});
