import { email, error, generateLoginCode, object } from "@snail/utils";
import { mutate } from "@utils";
import { codeCreate, EmailService, personCreate, personRead } from "@services";

export const register = mutate<{ email: string }>({
	input: object({ email }),
	handler: async ({ email }) => {
		const emailService = new EmailService();
		const person = await personRead(email);

		error(person !== null, "PERSON_ALREADY_EXISTS", { email });

		const loginCode = generateLoginCode();

		await Promise.all([
			emailService.code(email, { loginCode }),
			codeCreate(email, loginCode),
			personCreate(email),
		]);
	},
});
