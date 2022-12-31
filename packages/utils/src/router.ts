import { Type } from "./validation";

type Struct = Record<string, unknown>;
type Context = Struct;
type Input = Struct | void;
type Output = Struct | void;

type RouteType = "query" | "mutate";

type Route<
	T extends RouteType,
	C extends Context,
	I extends Input,
	O extends Output,
> = (input: I, context: C, type: T) => Promise<O>;

type Query<C extends Context, I extends Input, O extends Output> = Route<
	"query",
	C,
	I,
	O
>;
type Mutate<C extends Context, I extends Input, O extends Output> = Route<
	"mutate",
	C,
	I,
	O
>;

type Validations<C extends Context, I extends Input, O extends Output> = {
	input?: Type<I>;
	output?: Type<O>;
	context?: Type<C>;
};

const applyValidations =
	<C extends Context, I extends Input, O extends Output>(
		validations: Validations<C, I, O>,
		handler: (input: I, context: C) => Promise<O>,
	) =>
	async (input: I, context: C) => {
		validations.context?.(context);
		validations.input?.(input);

		const output = await handler(input, context);

		validations.output?.(output);

		return output;
	};

type Router<C extends Context> = Record<string, Route<any, C, any, any>>;

export const routerFactory = <C extends Context>() => ({
	router: <T extends Router<C>>(routes: T) => routes,
	query: <I extends Input, O extends Output>(
		validations: Validations<C, I, O>,
		handler: (input: I, context: C) => Promise<O>,
	): Query<C, I, O> => applyValidations(validations, handler),
	mutate: <I extends Input, O extends Output>(
		validations: {
			context: Type<C>;
			input: Type<I>;
			output: Type<O>;
		},
		handler: (input: I, context: C) => Promise<O>,
	): Mutate<C, I, O> => applyValidations(validations, handler),
});

export type PickRouteType<T extends RouteType, R extends Router<any>> = {
	[K in keyof R as R[K] extends Route<T, any, any, any> ? K : never]: R[K];
};

type InferRouteInput<T extends Route<any, any, any, any>> = T extends Route<
	any,
	any,
	infer X,
	any
>
	? X
	: never;
type InferRouteOutput<T extends Route<any, any, any, any>> = T extends Route<
	any,
	any,
	any,
	infer X
>
	? X
	: never;

export const fetcherFactory = <R extends Router<any>>(url: string) => {
	return {
		query: async <
			K extends keyof PickRouteType<"query", R>,
			I extends InferRouteInput<R[K]>,
			O extends InferRouteOutput<R[K]>,
		>(
			key: K,
			input: I,
			token?: string,
		) => {
			return (await (
				await fetch(
					`${url}/${key as string}${new URLSearchParams(input).toString()}`,
					{
						method: "GET",
						headers: token ? { authorization: `Bearer ${token}` } : {},
					},
				)
			).json()) as O;
		},
		mutate: async <
			K extends keyof PickRouteType<"query", R>,
			I extends InferRouteInput<R[K]>,
			O extends InferRouteOutput<R[K]>,
		>(
			key: K,
			input: I,
			token?: string,
		) => {
			return (await (
				await fetch(`${url}/${key as string}`, {
					method: "POST",
					body: JSON.stringify(input),
					headers: token ? { authorization: `Bearer ${token}` } : {},
				})
			).json()) as O;
		},
	};
};
