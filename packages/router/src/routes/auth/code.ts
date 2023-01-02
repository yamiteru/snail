import { error, generateLoginCode } from "@snail/utils";
import { codeCreate, EmailService, personRead } from "@services";
import { object, string } from "zod";
import { publicRoute } from "@utils";

export const code = publicRoute
	.input(object({ email: string() }))
	.mutation(async ({ input: { email } }) => {
		const emailService = new EmailService();
		const person = await personRead(email);

		error(person === null, "PERSON_DOES_NOT_EXIST", { email });

		const loginCode = generateLoginCode();

		await Promise.all([
			emailService.code(email, { loginCode }),
			codeCreate(email, loginCode),
		]);
	});
