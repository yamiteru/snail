import db from "../db";
import type {Nick} from "../brands";

type Data = {
	person: Nick;
};

export const createPersonInboxCollection = ({ person }: Data) => db
	.prepare(`CREATE TABLE IF NOT EXISTS ${person}_inbox (
			id TEXT PRIMARY KEY,
			person TEXT NOT NULL,
			title TEXT NOT NULL,
			content TEXT NOT NULL,
			date TEXT NOT NULL)`)
	.run();