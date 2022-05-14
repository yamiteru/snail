import {type, TypeOf} from "io-ts";
import { handler } from "serfun";
import {addPersonIntoList, checkIfPersonInSomeList, removePersonFromList} from "../queries";
import {Nick} from "../brands";
import {getMe} from "../utils/getMe";

const denyConnectionInput = type({
	source: Nick,
});

export type DenyConnectionInput = TypeOf<typeof denyConnectionInput>;

export const denyConnection = handler([denyConnectionInput, null], async ({ source }, headers) => {
	const { nick } = getMe(headers);
	const type = checkIfPersonInSomeList({ types: ["wait", "white"], source, person: nick });

	if(type) {
		removePersonFromList({ type, source, person: nick });
	}

	addPersonIntoList({ type: "black", source, person: nick });

	return null;
});