import {
	codeDelete,
	codeRead,
	personRead,
	personUpsert,
	tokenCreate,
} from "@services";
import { object, string } from "zod";
import { createJwt, minute } from "@snail/utils";
import { publicRoute } from "@utils";
import { TRPCError } from "@trpc/server";

export const login = publicRoute
	.input(object({ email: string().email(), loginCode: string() }))
	.output(object({ token: string() }))
	.mutation(async ({ input: { email, loginCode }, ctx: { ip } }) => {
		const person = await personRead(email);

		if (person === null) {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "User does not exist",
			});
		}

		const code = await codeRead(email);

		if (code === null) {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Code does not exist",
			});
		}

		if (code !== loginCode) {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Code is invalid",
			});
		}

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
