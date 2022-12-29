import { Handler } from "../../types";
import { authorize } from "../../utils/authorize";
import { Inbox, Token } from "../../controllers";
import {
	array,
	date,
	email,
	number,
	object,
	string,
	validate,
} from "@snail/utils";

const outputSchema = array(
	object({
		from: email,
		date,
		words: number,
		intro: string,
	}),
);

export const list: Handler = async ({ headers }) => {
	const { me, token } = await authorize(headers());
	const [list] = await Promise.all([Inbox.list(me), Token.create(me, token)]);
	const length = list.keys.length;
	const res = [];

	for (let i = 0; i < length; ++i) {
		const { name, metadata } = list.keys[i];
		const key = name.split(":");
		const from = key[2];
		const date = key[3];
		const words = (metadata as any)?.w;
		const intro = (metadata as any)?.i;

		res.push({
			from,
			date,
			words,
			intro,
		});
	}

	return validate(outputSchema, res);
};
