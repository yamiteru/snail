import {Nick} from "../brands";
import db from "../db";
import {checkIfTableExists} from "./checkIfTableExists";

type Data = {
	source: Nick;
	person: Nick;
};

export const checkIfPersonInInbox = ({ source, person }: Data) => {
	const tableName = `${source}_inbox`;

	if(checkIfTableExists({ tableName })) {
		const { count } = db
			.prepare(`SELECT COUNT(*) as count FROM ${tableName} WHERE person = '${person}' LIMIT 1`)
			.get();

		return count === 1;
	}

	return false;
};