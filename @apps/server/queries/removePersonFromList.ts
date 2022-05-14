import {Nick} from "../brands";
import db from "../db";
import {checkIfTableExists} from "./checkIfTableExists";

type Data = {
	type: "wait" | "white" | "black";
	source: Nick;
	person: Nick;
};

export const removePersonFromList = ({ type, source, person }: Data) => {
	const tableName = `${source}_${type}`;

	if(checkIfTableExists({ tableName })) {
		db.prepare(`DELETE FROM ${tableName} WHERE nick='${person}'`)
			.run();
	}
};