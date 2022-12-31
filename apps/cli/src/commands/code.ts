import { command, error, input, log } from "../utils";
import { ApiService } from "../services";

export const code = command<[maybeEmail?: string]>({
	description: "Sends login code to email",
	handler: async ([maybeEmail]) => {
		const apiService = new ApiService();
		const email = maybeEmail || (await input("Email"));
		const data = await apiService.code(email);

		if ("error" in data) {
			return error(data.error as any);
		}

		log(`Login code has been send to ${email}`);
	},
});
