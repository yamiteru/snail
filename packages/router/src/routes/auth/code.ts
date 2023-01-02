import { email, error, generateLoginCode, object } from "@snail/utils";
import { mutate } from "@utils";
import { codeCreate, EmailService, personRead } from "@services";

export const code = mutate<{ email: string }>({
	input: object({ email }),
	handler: async ({ email }) => {
		const emailService = new EmailService();
		const person = await personRead(email);

		error(person === null, "PERSON_DOES_NOT_EXIST", { email });

		const loginCode = generateLoginCode();

		await Promise.all([
			emailService.code(email, { loginCode }),
			codeCreate(email, loginCode),
		]);
	},
});
