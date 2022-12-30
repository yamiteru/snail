import { email, error, generateLoginCode, object } from "@snail/utils";
import { handler } from "@utils";
import { CodeService, EmailService, PersonService } from "@services";

export const code = handler(
	{
		body: object({ email }),
	},
	async ({ body }) => {
		const emailService = new EmailService();
		const personService = new PersonService();
		const codeService = new CodeService();
		const { email } = await body();
		const person = await personService.read(email);

		error(person === null, "PERSON_DOES_NOT_EXIST", { email });

		const loginCode = generateLoginCode();

		await Promise.all([
			emailService.code(email, { loginCode }),
			codeService.create(email, loginCode),
		]);
	},
);
