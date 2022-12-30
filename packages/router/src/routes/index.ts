import { code, login, register } from "./auth";
import { list, read, send, unsend } from "./letter";
import { blacklist, remove, whitelist } from "./person";
import { createRouter } from "@utils";

export const router = createRouter({
	auth: {
		POST: { register, code, login },
	},
	person: {
		POST: { blacklist, whitelist },
		DELETE: { remove },
	},
	letter: {
		POST: { one: send },
		GET: { one: read, many: list },
		DELETE: { one: unsend },
	},
});
