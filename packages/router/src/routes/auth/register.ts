import { email, error, generateLoginCode, none, object } from "@snail/utils";
import { CodeService, EmailService, PersonService } from "@services";
import { mutate } from "@utils";

export const register = mutate(
	{
		context: object({}),
		input: object({ email }),
		output: none,
	},
	async ({ email }) => {
		const emailService = new EmailService();
		const personService = new PersonService();
		const codeService = new CodeService();

		const person = await personService.read(email);

		error(person !== null, "PERSON_ALREADY_EXISTS", { email });

		const loginCode = generateLoginCode();

		await Promise.all([
			emailService.code(email, { loginCode }),
			codeService.create(email, loginCode),
			personService.create(email),
		]);
	},
);
