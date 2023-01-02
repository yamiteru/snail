import { codeCreate, EmailService, personCreate, personRead } from "@services";
import { generateLoginCode } from "@snail/utils";
import { object, string } from "zod";
import { publicRoute } from "@utils";
import { TRPCError } from "@trpc/server";

export const register = publicRoute
	.input(object({ email: string().email() }))
	.mutation(async ({ input: { email } }) => {
		const emailService = new EmailService();
		const person = await personRead(email);

		if (person !== null) {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "User already exists",
			});
		}

		const loginCode = generateLoginCode();

		await Promise.all([
			emailService.code(email, { loginCode }),
			codeCreate(email, loginCode),
			personCreate(email),
		]);
	});
