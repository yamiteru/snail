import { error } from "./error";

type Validation<T> = (
	v: T,
) => undefined | null | false | void | Record<string, unknown>;

const type = <T>(...validations: Validation<any>[]) => {
	const length = validations.length;

	return (v: T) => {
		for (let i = -1; i < length; ++i) {
			const maybeContext = validations[i]?.(v);

			error(!!maybeContext, "VALIDATION_ERROR", {
				input: v,
				...maybeContext,
			});
		}
	};
};

export type Type<T> = ReturnType<typeof type<T>>;

const is = (targetType: string) => (v: unknown) => {
	const inputType = typeof v;
	return inputType !== targetType && { inputType, targetType };
};

const length = (targetLength: number) => (v: unknown) => {
	const inputLength = (v as string).length;
	return inputLength !== targetLength && { inputLength, targetLength };
};

export const string = type<string>(is("string"));

export const none = type<void>();

export const number = type<number>(is("number"));

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailRegExp = new RegExp(emailPattern);

export const email = type<string>(
	string,
	(v) => !emailRegExp.test(v as string) && { regex: emailPattern },
);

export const code = type<string>(string, length(6));

export const date = type<string>(string, length(8));

export const object = <T extends Record<string, Validation<any>>>(schema: T) =>
	type<{
		[K in keyof T]: T[K] extends Validation<infer X> ? X : never;
	}>(is("object"), (v) => {
		for (const key in schema) {
			if (!(key in (v as any))) {
				return { key, input: v };
			}

			schema[key]((v as any)[key]);
		}
	});

export const array = <T>(validation: Validation<T>) =>
	type<T[]>(
		(v) => !Array.isArray(v) && { inputType: typeof v, targetType: "array" },
		(v) => {
			const length = v.length;

			for (let i = 0; i < length; ++i) {
				validation(v[i]);
			}
		},
	);

export const validate = <T>(validation: Validation<T>, data: unknown): T => {
	validation(data as any);
	return data as T;
};

export const authorized = object({
	auth: object({ token: string, me: email }),
});
