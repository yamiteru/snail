import { error } from "./error";

type Validation<T> = (v: T) => undefined | null | false | void | string;

export const type = <T>(...validations: Validation<any>[]) => {
	const length = validations.length;

	return (v: T) => {
		for (let i = 0; i < length; ++i) {
			const maybeErrorMessage = validations[i](v);

			error(!!maybeErrorMessage, "VALIDATION_ERROR", {
				input: v,
				message: maybeErrorMessage as string,
			});
		}
	};
};

export const is = (type: string) => (v: unknown) =>
	typeof v !== type && `Should be of type ${type}`;

export const length = (number: number) => (v: unknown) =>
	(v as string).length !== number && `Should have length of ${number}`;

export const string = type<string>(is("string"));

export const number = type<number>(is("number"));

const emailRegExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export const email = type<string>(
	string,
	(v) => !emailRegExp.test(v as string) && "Should be an email",
);

export const code = type<string>(string, length(6));

export const date = type<string>(string, length(8));

export const object = <T extends Record<string, Validation<any>>>(schema: T) =>
	type<{
		[K in keyof T]: T[K] extends Validation<infer X> ? X : never;
	}>(is("object"), (v) => {
		for (const key in schema) {
			if (!(key in (v as any))) {
				return `Should have key ${key}`;
			}

			schema[key]((v as any)[key]);
		}
	});

export const array = <T>(validation: Validation<T>) =>
	type<T[]>(
		(v) => !Array.isArray(v) && `Should be of type array`,
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
