import {handler} from "serfun";
import {type, string, TypeOf} from "io-ts";
import {Nick} from "../brands";
import {checkIfPersonExists, checkIfPersonInInbox, checkIfPersonInList} from "../queries";
import {getMe} from "../utils/getMe";
import {addLetterIntoInbox} from "../queries/addLetterIntoInbox";

const inputSendLetter = type({
	to: Nick,
	title: string,
	content: string
});

export type InputSendLetter = TypeOf<typeof inputSendLetter>;

const outputSendLetter = type({
	id: string
});

export type OutputSendLetter = TypeOf<typeof outputSendLetter>;

export const sendLetter = handler(
	[inputSendLetter, outputSendLetter],
	async ({to, title, content}, headers) => {
		const { nick } = getMe(headers);

		if (!checkIfPersonExists({nick: to})) {
			throw new Error(`User "${to}" does not exist`);
		}

		if (checkIfPersonInList({
			type: "black",
			source: to,
			person: nick
		})) {
      throw new Error(`You are in "${to}" blacklist`);
    }

		if (checkIfPersonInList({
			type: "wait",
			source: to,
			person: nick
		})) {
      throw new Error(`You are in "${to}" waitlist`);
    }

		if(checkIfPersonInInbox({
			source: to,
			person: nick
		})) {
			throw new Error(`You are already in "${to}" inbox`);
		}

		const id = addLetterIntoInbox({ from: nick, to, title, content });

		return { id };
	});