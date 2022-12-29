import {
	email,
	error,
	generateLoginCode,
	object,
	validate,
} from "@snail/utils";
import { sendEmail } from "../../utils";
import { Handler } from "../../types";
import { Code, Person } from "../../controllers";

const bodySchema = object({ email });

export const code: Handler = async ({
	body,
	env: { SENDGRID_TEMPLATE_LOGIN_CODE },
}) => {
	const { email } = validate(bodySchema, await body());
	const person = await Person.read(email);

	error(person === null, "PERSON_DOES_NOT_EXIST", { email });

	const loginCode = generateLoginCode();

	await Promise.all([
		sendEmail(SENDGRID_TEMPLATE_LOGIN_CODE, { loginCode }, email),
		Code.create(email, loginCode),
	]);
};
