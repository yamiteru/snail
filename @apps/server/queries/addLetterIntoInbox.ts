import {InputSendLetter} from "../api/sendLetter";
import type {Nick} from "../brands";
import db from "../db";
import {randomUUID} from "crypto";
import {createPersonInboxCollection} from "./createPersonInboxCollection";
import {addPersonIntoList} from "./addPersonIntoList";
import {checkIfPersonInList} from "./checkIfPersonInList";

type Data = {
	from: Nick;
} & InputSendLetter;

export const addLetterIntoInbox = ({ from, to, title, content }: Data) => {
	const tableName = `${to}_inbox`;

	createPersonInboxCollection({ person: to });

	if(!checkIfPersonInList({
		type: "white",
		source: to,
		person: from
	})) {
		addPersonIntoList({type: "wait", source: to, person: from});
	}

	const id = randomUUID();
	const now = new Date().toISOString();


	db.prepare(`INSERT INTO ${tableName}
		(id, person, title, content, date) VALUES
		('${id}','${from}','${title}','${content}', '${now}')`)
		.run();

	return id;
};