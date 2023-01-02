import Auth from "./auth";
import { router } from "@utils";
import Letter from "./letter";
import Person from "./person";

export const appRouter = router({
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
