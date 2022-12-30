import { email, error, generateLoginCode, object } from "@snail/utils";
import { handler } from "@utils";
import { CodeService, EmailService, PersonService } from "@services";

export const register = handler(
	{
		body: object({ email }),
	},
	async ({ body }) => {
		const { email } = await body();
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
