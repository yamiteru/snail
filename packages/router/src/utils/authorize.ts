import { decodeJwt, error } from "@snail/utils";

export const authorize = (async (headers: Record<string, string>) => {
	console.log(headers);
	const bearer = headers["authorization"];

	error(!bearer, "TOKEN_IS_MISSING", null);

	const token = (bearer as string).slice(7);

	try {
		return { me: decodeJwt(token).email as string, token };
	} catch {
		error(true, "TOKEN_IS_INVALID", { token });
	}
}) as (
	headers: Record<string, string>,
) => Promise<{ me: string; token: string }>;
