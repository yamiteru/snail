import db from "../db";
import type {Nick} from "../brands";
import {createPersonListCollection} from "./createPersonListCollection";

type Data = {
	type: "wait" | "white" | "black";
	source: Nick;
	person: Nick;
};

export const addPersonIntoList = ({ type, source, person }: Data) => {
	createPersonListCollection({ type, person: source });

	return db
		.prepare(`INSERT INTO ${source}_${type} 
			(nick) VALUES
			('${person}')`)
		.run();
};