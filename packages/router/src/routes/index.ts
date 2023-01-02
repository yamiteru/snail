import Auth from "./auth";
import Letter from "./letter";
import Person from "./person";
import { t } from "@utils";

export const appRouter = t.router({
	// AUTH
	"auth-register": Auth.register,
	"auth-code": Auth.code,
	"auth-login": Auth.login,
	// LETTER
	"letter-list": Letter.list,
	"letter-read": Letter.read,
	"letter-send": Letter.send,
	"letter-unsend": Letter.unsend,
	// PERSON
	"person-allow": Person.allow,
	"person-block": Person.block,
	"person-blocked": Person.blocked,
	"person-remove": Person.remove,
});

export type AppRouter = typeof appRouter;
