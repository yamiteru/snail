import { Handler } from "../../types";
import { dateKey, email, error, object, string, validate } from "@snail/utils";
import { Blacklist, Inbox } from "../../controllers";
import { authorize } from "../../utils/authorize";

const bodySchema = object({ to: email, content: string });

export const send: Handler = async ({ body, headers }) => {
	const { to, content } = validate(bodySchema, await body());
	const { me } = await authorize(headers());
	const date = dateKey();
	const letterFromToday = await Inbox.read(to, me, date);

	error(letterFromToday !== null, "OUT_OF_LETTERS", { from: me, to, date });

	const blacklistedUser = await Blacklist.read(to, me);

	error(!!blacklistedUser, "PERSON_BLACKLISTED", { target: me, by: to });

	await Inbox.create(to, me, date, content);
};
