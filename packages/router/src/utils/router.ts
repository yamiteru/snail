import { decodeJwt, error, Validation, verifyJwt } from "@snail/utils";
import { personRead } from "@services";

export type Handler<Input, Output, Context> = (
	input: Input,
	context: Context,
) => Promise<Output>;

export type Route<
	Type extends "query" | "mutate" = any,
	Input = any,
	Output = any,
	Context = any,
> = {
	type: Type;
	input?: Validation<Input>;
	output?: Validation<Output>;
	context?: (request: Request) => Promise<Context>;
	handler: Handler<Input, Output, Context>;
};

export type Query<Input, Output, Context> = Route<
	"query",
	Input,
	Output,
	Context
>;

export type Mutate<Input, Output, Context> = Route<
	"mutate",
	Input,
	Output,
	Context
>;

export const query = <Input, Output, Context>(
	route: Omit<Route<any, Input, Output, Context>, "type">,
): Query<Input, Output, Context> => ({
	type: "query",
	...route,
});

export const mutate = <Input = undefined, Output = void, Context = undefined>(
	route: Omit<Route<any, Input, Output, Context>, "type">,
): Mutate<Input, Output, Context> => ({
	type: "mutate",
	...route,
});

export const call = async <Input, Output, Context>(
	{ type, input, output, context, handler }: Route<any, Input, Output, Context>,
	request: Request,
) => {
	const isQuery = type === "query";
	const method = request.method.toLowerCase();

	error(isQuery && method !== "get", "ROUTE_METHOD_MISMATCH", { method, type });
	error(!isQuery && method !== "post", "ROUTE_METHOD_MISMATCH", {
		method,
		type,
	});

	const inputData =
		type === "query"
			? Object.fromEntries(new URL(request.url).searchParams.entries())
			: await request.json();

	input?.(inputData);

	const contextData = (await context?.(request)) as Context;
	const outputData = await handler(inputData, contextData);

	output?.(outputData);

	return outputData;
};

export const router = <T extends Record<string, Route>>(routes: T) => routes;

export type FilterRoutesByType<
	T extends "query" | "mutate",
	R extends Record<string, Route>,
> = {
	[K in keyof R as R[K] extends Route<T> ? K : never]: R[K];
};

export type QueryRoutes<T extends Record<string, Route>> = FilterRoutesByType<
	"query",
	T
>;

export type MutateRoutes<T extends Record<string, Route>> = FilterRoutesByType<
	"mutate",
	T
>;

export const fetcher = <T extends Record<string, Route>>(url: string) => ({
	query: <
		R extends QueryRoutes<T>,
		N extends keyof R,
		I extends R[N] extends Mutate<infer X, any, any> ? X : never,
	>(
		name: N,
		input: I,
		token?: string,
	) =>
		fetch(
			`${url}/${String(name)}${new URLSearchParams(input as any).toString()}`,
			{
				method: "GET",
				headers: token ? { authorization: `Bearer ${token}` } : {},
			},
		),
	mutate: <
		R extends MutateRoutes<T>,
		N extends keyof R,
		I extends R[N] extends Mutate<infer X, any, any> ? X : never,
	>(
		name: N,
		input: I,
		token?: string,
	) =>
		fetch(`${url}/${String(name)}`, {
			method: "POST",
			headers: token ? { authorization: `Bearer ${token}` } : {},
			body: JSON.stringify(input),
		}),
});

export type AuthContext = { me: string; token: string };

export const authContext = async (request: Request) => {
	const bearer = request.headers.get("authorization");

	error(!bearer, "TOKEN_IS_MISSING", null);

	const token = (bearer as string).slice(7);
	const email = decodeJwt(token).email as string;
	const { ip } = await ipContext(request);
	const secret = await personRead(email);

	error(secret === null, "PERSON_DOES_NOT_EXIST", { email });

	try {
		await verifyJwt(bindings.SECRET + secret + ip, token);
	} catch {
		error(true, "TOKEN_IS_INVALID", { token });
	}

	return { me: email, token };
};

export type IpContext = { ip: string };

export const ipContext = async (request: Request) => ({
	ip:
		request.headers.get("cf-connecting-ip") ||
		request.headers.get("x-real-ip") ||
		"0",
});
