import { Handler } from "../../types";
import { Blacklist } from "../../controllers";
import { authorize } from "../../utils/authorize";
import { email, object, validate } from "@snail/utils";

const bodySchema = object({ email });

export const blacklist: Handler = async ({ body, headers }) => {
	const { email } = validate(bodySchema, await body());
	const { me } = await authorize(headers());

	await Blacklist.add(me, email);
};
