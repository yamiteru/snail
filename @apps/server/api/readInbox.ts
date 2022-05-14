import {handler} from "serfun";
import {array, string, type} from "io-ts";
import {getMe} from "../utils/getMe";
import {checkIfTableExists, dropInboxTable, readAllInboxLetters} from "../queries";
import {Nick} from "../brands";

const readInboxOutput = type({
	letters: array(type({
		id: string,
		person: Nick,
		title: string,
		content: string,
		date: string,
	}))
});

export const readInbox = handler([null, readInboxOutput], async (_, headers) => {
	const { nick } = getMe(headers);
	const tableName = `${nick}_inbox`;

	if(checkIfTableExists({ tableName })) {
		const letters = readAllInboxLetters({ tableName });

		dropInboxTable({ tableName });

		return { letters };
	}

	return { letters: [] };
});