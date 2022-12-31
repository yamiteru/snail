import { commands } from "./index";
import { command } from "../utils";

export const help = command({
	description: "Shows you all of the commands",
	handler: async () => {
		for (const key in commands) {
			console.log(
				`${key.padEnd(12, " ")} ${(commands as any)[key].description}`,
			);
		}
	},
});
