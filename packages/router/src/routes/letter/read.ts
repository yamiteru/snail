import { Handler } from "../../types";
import { authorize } from "../../utils/authorize";
import { Inbox } from "../../controllers";
import { date, email, error, object, string, validate } from "@snail/utils";

const paramsSchema = object({ from: email, date });
const outputSchema = string;

export const read: Handler = async ({ headers, params }) => {
	const { from, date } = validate(paramsSchema, params());
	const { me } = await authorize(headers());

	const letter = await Inbox.read(me, from, date);

	error(letter === null, "LETTER_DOES_NOT_EXIST", { from, to: me, date });

	await Inbox.drop(me, from, date);

	return validate(outputSchema, letter);
};
