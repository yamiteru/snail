import db from "../db";
import type {Nick} from "../brands";

type Data = {
	type: "wait" | "white" | "black";
	person: Nick;
};

export const createPersonListCollection = ({ type, person }: Data) => db
	.prepare(`CREATE TABLE IF NOT EXISTS ${person}_${type} (
			nick TEXT PRIMARY KEY
		)`)
	.run();