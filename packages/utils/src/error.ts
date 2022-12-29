import { Nullable } from "@snail/types";

const ERROR_MAP = {
	PERSON_DOES_NOT_EXIST: (p: { email: string }) =>
		`Person "${p.email}" does not exist`,
	PERSON_ALREADY_EXISTS: (p: { email: string }) =>
		`Person "${p.email}" does already exist`,
	TOKEN_IS_MISSING: () => `Token is missing from headers`,
	TOKEN_IS_INVALID: (p: { token: string }) => `Token "${p.token}" is invalid`,
	CODE_DOES_NOT_EXIST: (p: { email: string }) =>
		`Login code for person "${p.email}" does not exist`,
	CODE_IS_INVALID: (p: { email: string }) =>
		`Login code for person "${p.email}" is invalid`,
	LETTER_DOES_NOT_EXIST: (p: { from: string; to: string; date: string }) =>
		`Letter from "${p.from}" to "${p.to}" from date "${p.date}" does not exist`,
	OUT_OF_LETTERS: (p: { from: string; to: string; date: string }) =>
		`Person "${p.from}" cannot send more letters to person "${p.to}" on date "${p.date}"`,
	PERSON_BLACKLISTED: (p: { target: string; by: string }) =>
		`Person "${p.target}" is blacklisted by person "${p.by}"`,
	VALIDATION_ERROR: (p: { input: unknown; message: string }) =>
		`Value "${JSON.stringify(p.input)}" threw an error "${p.message}"`,
} satisfies Record<string, (props: any) => string>;

type ErrorMap = typeof ERROR_MAP;

type InferErrorProps<R extends keyof ErrorMap> = ErrorMap[R] extends (
	props: infer X,
) => string
	? X
	: never;

export const error = <R extends keyof ErrorMap, P extends InferErrorProps<R>>(
	predicate: boolean,
	reason: R,
	props: P,
	context: Nullable<Record<string, any>> = null,
) => {
	if (predicate) {
		throw [reason, ERROR_MAP[reason](props as any), context];
	}
};
