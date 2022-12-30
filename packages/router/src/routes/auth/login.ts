import {
	code,
	createJwt,
	email,
	error,
	object,
	string,
	Time,
} from "@snail/utils";
import { handler } from "@utils";
import { CodeService, PersonService, TokenService } from "@services";

export const login = handler(
	{
		body: object({ email, loginCode: code }),
		output: string,
	},
	async ({ body, headers }) => {
		const { email, loginCode } = await body();
		const personService = new PersonService();
		const codeService = new CodeService();
		const tokenService = new TokenService();
		const person = await personService.read(email);

		error(person === null, "PERSON_DOES_NOT_EXIST", { email });

		const code = await codeService.read(email);

		error(code === null, "CODE_DOES_NOT_EXIST", { email });
		error(code !== loginCode, "CODE_IS_INVALID", { email });

		const ip = headers()["cf-connecting-ip"] || "0";
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
			secretIsEmpty && personService.upsert(email, secret),
			codeService.drop(email),
			tokenService.create(email, token),
		]);

		if (secretIsEmpty) {
			await personService.read(email, Time.minute.seconds);
		}

		return token;
	},
);
