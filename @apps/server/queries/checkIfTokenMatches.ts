import type {Nick} from "../brands";
import db from "../db";

type Data = {
	nick: Nick;
	token: string;
};

export const checkIfTokenMatches = ({ nick, token }: Data) => {
	const query = `SELECT COUNT(*) as count FROM person WHERE nick = '${nick}' AND token = '${token}' LIMIT 1`;
	const { count } = db.prepare(query).get();

	return count === 1;
};