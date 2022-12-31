import { command, error } from "../utils";
import { ApiService, StoreService } from "../services";

export const inbox = command({
	description: "Get letters from inbox",
	handler: async () => {
		const apiService = new ApiService();
		const storeService = new StoreService();
		const { email } = await storeService.readCustomConfig();
		const data = await apiService.inbox(email as string);

		if ("error" in data) {
			return error(data.error as any);
		}

		(
			data.data as {
				from: string;
				date: string;
				words: number;
				intro: string;
			}[]
		).forEach(({ from, date, words, intro }) =>
			console.log(
				`${from.padEnd(12, " ")} ${date} ${`${words}`.padEnd(
					12,
					" ",
				)} ${intro}`,
			),
		);
	},
});
