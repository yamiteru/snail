import { error } from "./error";

export type Validation<T = any> = (v: unknown) => T;

export type InferValidation<T extends Validation> = T extends Validation<
	infer X
>
	? X
	: never;

export type ValidationObject = Record<string, Validation>;

export type InferValidationObject<T extends ValidationObject> = {
	[K in keyof T]: InferValidation<T[K]>;
};

const type = <T>(...validations: Validation[]) => {
	const length = validations.length;

	return (v: unknown) => {
		try {
			for (let i = -1; i < length; ++i) {
				validations[i]?.(v);
			}
		} catch (e) {
			error(true, "VALIDATION_ERROR", {
				input: v,
				...(e as Record<string, unknown>),
			});
		}

		return v as T;
	};
};

const is = (targetType: string) => (v: unknown) => {
	const inputType = typeof v;

	if (inputType !== targetType) {
		throw { inputType, targetType };
	}
};

const length = (targetLength: number) => (v: unknown) => {
	const inputLength = (v as any[]).length;

	if (inputLength !== targetLength) {
		throw { inputLength, targetLength };
	}
};

export const string = type<string>(is("string"));

export const none = type<void>();

export const number = type<number>(is("number"));

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailRegExp = new RegExp(emailPattern);

export const email = type<string>(string, (v) => {
	if (!emailRegExp.test(v as string)) {
		throw { regex: emailPattern };
	}
});

export const code = type<string>(string, length(6));

export const date = type<string>(string, length(8));

export const object = <
	T extends ValidationObject,
	D extends InferValidationObject<T>,
>(
	schema: T,
) =>
	type<D>(is("object"), (v) => {
		for (const key in schema) {
			if (!(key in (v as D))) {
				throw { key, input: v };
			}

			schema[key]((v as D)[key]);
		}
	});

export const array = <T>(validation: Validation<T>) =>
	type<T[]>((v) => {
		if (!Array.isArray(v)) {
			throw { inputType: typeof v, targetType: "array" };
		}

		const length = (v as T[]).length;

		for (let i = 0; i < length; ++i) {
			validation((v as T[])[i]);
		}
	});

export const validate = <T>(validation: Validation<T>, data: unknown): T => {
	validation(data as any);
	return data as T;
};
