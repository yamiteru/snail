type Error = {
	PERSON_DOES_NOT_EXIST: { email: string };
	PERSON_ALREADY_EXISTS: { email: string };
	TOKEN_IS_MISSING: null;
	TOKEN_IS_INVALID: { token: string };
	CODE_DOES_NOT_EXIST: { email: string };
	CODE_IS_INVALID: { email: string };
	LETTER_DOES_NOT_EXIST: { from: string; to: string; date: string };
	OUT_OF_LETTERS: { from: string; to: string; date: string };
	PERSON_BLACKLISTED: { target: string; by: string };
	VALIDATION_ERROR: { input: unknown; [key: string]: unknown };
};

export const error = <T extends keyof Error>(
	predicate: boolean,
	reason: T,
	context: Error[T],
) => {
	if (predicate) throw { reason, context };
};
