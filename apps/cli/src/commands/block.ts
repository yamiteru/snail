import { ApiService } from "../services";
import { command, error, input, log } from "../utils";

export const block = command<[maybeEmail?: string]>({
	description: "Blocks a person",
	handler: async ([maybeEmail]) => {
		const apiService = new ApiService();
		const email = maybeEmail || (await input("Email"));
		const data = await apiService.block(email);

		if ("error" in data) {
			error(data.error as any);
		}

		log(`Person ${email} has been blocked`);
	},
});
