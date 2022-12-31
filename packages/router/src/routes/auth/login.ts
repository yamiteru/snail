import {
	code,
	createJwt,
	email,
	error,
	object,
	string,
	Time,
} from "@snail/utils";
import { mutate } from "@utils";
import { CodeService, PersonService, TokenService } from "@services";

export const login = mutate(
	{
		context: object({}),
		input: object({ email, loginCode: code }),
		output: object({ token: string }),
	},
	async ({ email, loginCode }, { request: { ip } }) => {
		const personService = new PersonService();
		const codeService = new CodeService();
		const tokenService = new TokenService();
		const person = await personService.read(email);

		error(person === null, "PERSON_DOES_NOT_EXIST", { email });

		const code = await codeService.read(email);

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
			secretIsEmpty && personService.upsert(email, secret),
			codeService.drop(email),
			tokenService.create(email, token),
		]);

		if (secretIsEmpty) {
			await personService.read(email, Time.minute.seconds);
		}

		return { token };
	},
);
