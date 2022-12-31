import { command, error, input, log } from "../utils";
import { ApiService } from "../services";

export const allow = command<[maybeEmail?: string]>({
	description: "Unblocks a person",
	handler: async ([maybeEmail]) => {
		const apiService = new ApiService();
		const email = maybeEmail || (await input("Email"));
		const data = await apiService.allow(email);

		if ("error" in data) {
			error(data.error as any);
		}

		log(`Person ${email} has been unblocked`);
	},
});
