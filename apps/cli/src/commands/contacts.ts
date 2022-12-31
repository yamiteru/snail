import { command, log } from "../utils";
import { StoreService } from "../services";

export const contacts = command({
	description: "Lists all contacts that have at least 1 letter",
	handler: async () => {
		const storeService = new StoreService();
		const contacts = await storeService.readContacts();

		if (contacts.length) {
			contacts.forEach(log);
		} else {
			log("No contacts found");
		}
	},
});
