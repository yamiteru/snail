import { command, input, log } from "../utils";
import { ApiService, StoreService } from "../services";

export const read = command<[maybeFrom?: string, maybeDate?: string]>({
	description: "Read a letter",
	handler: async ([maybeFrom, maybeDate]) => {
		const from = maybeFrom || (await input("From"));
		const date = maybeDate || (await input("Date"));
		const apiService = new ApiService();
		const storeService = new StoreService();
		const localLetter = await storeService.readLetter(from, date);

		if (localLetter) {
			log(localLetter);
		} else {
			const fetchedLetter = await apiService.letterRead(from, date);

			if ("error" in fetchedLetter) {
				log("Letter was not found");
			} else {
				await storeService.createLetter(
					from,
					date,
					fetchedLetter.data as string,
				);
			}
		}
	},
});
