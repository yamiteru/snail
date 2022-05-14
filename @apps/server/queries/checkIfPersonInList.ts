import type {Nick} from "../brands";
import {checkIfTableExists} from "./checkIfTableExists";
import db from "../db";

type Data = {
	type: "wait" | "white" | "black";
	source: Nick;
	person: Nick;
};

export const checkIfPersonInList = ({ type, source, person }: Data) => {
	const tableName = `${source}_${type}`;

	if(checkIfTableExists({ tableName })) {
		const query = `SELECT COUNT(*) as count FROM ${tableName} WHERE nick='${person}' LIMIT 1`;
		const { count } = db.prepare(query).get();

		return count === 1;
	}

	return false;
};