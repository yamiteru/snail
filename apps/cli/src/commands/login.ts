import { command, error, input, log } from "../utils";
import { ApiService, StoreService } from "../services";

export const login = command<[maybeEmail?: string, maybeLoginCode?: string]>({
	description: "Logs you into the app",
	handler: async ([maybeEmail, maybeLoginCode]) => {
		const apiService = new ApiService();
		const storeService = new StoreService();
		const email = maybeEmail || (await input("Email"));
		const loginCode = maybeLoginCode || (await input("Login code"));
		const data = await apiService.login(email, loginCode);

		if ("error" in data) {
			return error(data.error as any);
		}

		await storeService.upsertCustomConfig({
			email,
			token: data.data as string,
		});

		const blocked = await apiService.blocked();

		if ("error" in blocked) {
			return error(blocked.error as any);
		}

		await storeService.upsertCustomConfig({
			blocked: blocked.data as any,
		});

		log("You have been successfully logged in");
	},
});
