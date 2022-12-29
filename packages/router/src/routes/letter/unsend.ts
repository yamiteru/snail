import { authorize } from "../../utils/authorize";
import { Inbox } from "../../controllers";
import { Handler } from "../../types";
import { date, email, object, Seconds, validate } from "@snail/utils";

const bodySchema = object({ to: email, date });

export const unsend: Handler = async ({ body, headers }) => {
	const { to, date } = validate(bodySchema, await body());
	const { me } = await authorize(headers());

	await Inbox.drop(to, me, date);
	await Inbox.read(to, me, date, Seconds.minute);
};
