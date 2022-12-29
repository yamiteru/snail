import { code, login, register } from "./auth";
import { list, read, send, unsend } from "./letter";
import { blacklist, remove, whitelist } from "./person";

export const router = {
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
};
