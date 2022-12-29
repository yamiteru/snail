import {
	code,
	createJwt,
	email,
	error,
	object,
	Seconds,
	string,
	validate,
} from "@snail/utils";
import { Handler } from "../../types";
import { Code, Person, Token } from "../../controllers";

const bodySchema = object({ email, loginCode: code });
const outputSchema = string;

export const login: Handler = async ({ body, headers }) => {
	const { email, loginCode } = validate(bodySchema, await body());
	const person = await Person.read(email);

	error(person === null, "PERSON_DOES_NOT_EXIST", { email });

	const code = await Code.read(email);

	error(code === null, "CODE_DOES_NOT_EXIST", { email });
	error(code !== loginCode, "CODE_IS_INVALID", { email });

	const ip = headers()["cf-connecting-ip"] || "0";
	const expiration = new Date();

	expiration.setDate(expiration.getDate() + 7);

	const secretIsEmpty = person === "";
	const secret = secretIsEmpty ? crypto.randomUUID() : (person as string);
	const token = await createJwt(bindings.SECRET + secret + ip, { email }, "7d");

	await Promise.all([
		secretIsEmpty && Person.upsert(email, secret),
		Code.drop(email),
		Token.create(email, token),
	]);

	if (secretIsEmpty) {
		await Person.read(email, Seconds.minute);
	}

	return validate(outputSchema, token);
};
