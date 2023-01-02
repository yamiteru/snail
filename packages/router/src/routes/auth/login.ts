import { IpContext, ipContext, mutate } from "@utils";
import {
	code,
	createJwt,
	email,
	error,
	minute,
	object,
	string,
} from "@snail/utils";
import {
	codeDelete,
	codeRead,
	personRead,
	personUpsert,
	tokenCreate,
} from "@services";

export const login = mutate<
	{ email: string; loginCode: string },
	{ token: string },
	IpContext
>({
	input: object({ email, loginCode: code }),
	output: object({ token: string }),
	context: ipContext,
	handler: async ({ email, loginCode }, { ip }) => {
		const person = await personRead(email);

		error(person === null, "PERSON_DOES_NOT_EXIST", { email });

		const code = await codeRead(email);

		error(code === null, "CODE_DOES_NOT_EXIST", { email });
		error(code !== loginCode, "CODE_IS_INVALID", { email });

		const expiration = new Date();

		expiration.setDate(expiration.getDate() + 7);

		const secretIsEmpty = person === "";
		const secret = secretIsEmpty ? crypto.randomUUID() : (person as string);
		const token = await createJwt(
			bindings.SECRET + secret + ip,
			{ email },
			"7d",
		);

		await Promise.all([
			secretIsEmpty && personUpsert(email, secret),
			codeDelete(email),
			tokenCreate(email, token),
		]);

		if (secretIsEmpty) {
			await personRead(email, minute);
		}

		return { token };
	},
});
