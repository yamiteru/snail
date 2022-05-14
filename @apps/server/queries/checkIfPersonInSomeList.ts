import type {Nick} from "../brands";
import {checkIfPersonInList} from "./checkIfPersonInList";

type Data = {
	types: ("wait" | "white" | "black")[];
	source: Nick;
	person: Nick;
};

export const checkIfPersonInSomeList = ({ types, source, person }: Data) => {
	for(const type of types) {
		if(checkIfPersonInList({ type, source, person })) {
			return type;
		}
	}

	return false;
};