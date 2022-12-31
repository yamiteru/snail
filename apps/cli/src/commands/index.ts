import { createCommands } from "../utils";
import { setup } from "./setup";
import { help } from "./help";
import { register } from "./register";
import { login } from "./login";
import { code } from "./code";
import { logout } from "./logout";
import { contacts } from "./contacts";
import { send } from "./send";
import { allow } from "./allow";
import { block } from "./block";
import { letters } from "./letters";

export const commands = createCommands({
	help,
	setup,
	register,
	login,
	code,
	logout,
	contacts,
	send,
	allow,
	block,
	letters,
});
