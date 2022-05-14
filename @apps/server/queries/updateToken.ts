import { RegisterInput } from "../api/register";
import db from "../db";

type Data = {
	token: string | null;
} & Pick<RegisterInput, "nick">;

export const updateToken = ({ nick, token }: Data) => {
	const tokenValue = token === null
		? "null"
		: `'${token}'`;

	return db
		.prepare(`UPDATE person SET token=${tokenValue} WHERE nick='${nick}'`)
		.run();
}