import { code, login, register } from "./auth";
import { list, read, send, unsend } from "./letter";
import { allow, block, blocked, remove } from "./person";
import { createRouter } from "@utils";

export const router = createRouter({
	auth: {
		POST: { register, code, login },
	},
	person: {
		GET: { blocked },
		POST: { block, allow },
		DELETE: { remove },
	},
	letter: {
		POST: { one: send },
		GET: { one: read, many: list },
		DELETE: { one: unsend },
	},
});
