import {
	codeDelete,
	codeRead,
	personRead,
	personUpsert,
	tokenCreate,
} from "@services";
import { object, string } from "zod";
import { createJwt, error, minute } from "@snail/utils";
import { publicRoute } from "@utils";

export const login = publicRoute
	.input(object({ email: string().email(), loginCode: string() }))
	.output(object({ token: string() }))
	.mutation(async ({ input: { email, loginCode }, ctx: { ip } }) => {
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
	});
