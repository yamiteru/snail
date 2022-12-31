import { command, error, input, log } from "../utils";
import { ApiService } from "../services";

export const register = command<[maybeEmail?: string]>({
	description: "Registers user",
	handler: async ([maybeEmail]) => {
		const apiService = new ApiService();
		const email = maybeEmail || (await input("Email"));
		const data = await apiService.register(email);

		if ("error" in data) {
			return error(data.error as any);
		}

		log(`Login code has been send to ${email}`);
	},
});
