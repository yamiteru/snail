import { handler } from "serfun";
import { type, TypeOf } from "io-ts";
import {addPersonIntoList, checkIfPersonInSomeList, removePersonFromList} from "../queries";
import { Nick } from "../brands";
import {getMe} from "../utils/getMe";

const allowConnectionInput = type({
	source: Nick,
});

export type AllowConnectionInput = TypeOf<typeof allowConnectionInput>;

export const allowConnection = handler([allowConnectionInput, null], async ({ source}, headers) => {
	const { nick } = getMe(headers);
	const type = checkIfPersonInSomeList({ types: ["wait", "black"], source, person: nick });

	if(type) {
		removePersonFromList({ type, source, person: nick });
	}

	addPersonIntoList({ type: "white", source, person: nick });

	return null;
});