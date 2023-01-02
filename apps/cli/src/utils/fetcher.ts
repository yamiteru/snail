import { Query, Route } from "@snail/router/src/utils";
import fetch from "node-fetch";
import { AppRouter } from "@snail/router";
import { Validation } from "@snail/utils";

export type FilterRoutesByType<
	T extends "query" | "mutate",
	R extends Record<string, Route>,
> = {
	[K in keyof R as R[K] extends Route<T> ? K : never]: R[K];
};

export type QueryRoutes = FilterRoutesByType<"query", AppRouter>;

export type QueryKeys = keyof QueryRoutes;

export type MutateRoutes = FilterRoutesByType<"mutate", AppRouter>;

export type MutateKeys = keyof MutateRoutes;

const url = "http://localhost:8787";

export const query = async <R extends Route>(
	name: QueryKeys,
	input: string,
	token?: string,
) => {
	const response = await fetch(
		`${url}/${String(name)}${new URLSearchParams(input as any).toString()}`,
		{
			method: "GET",
			headers: token ? { authorization: `Bearer ${token}` } : {},
		},
	);

	return (await response.json()) as R extends Query<any, infer X, any>
		? X
		: undefined;
};

type X = MutateRoutes["auth-register"]["input"] extends Validation<infer X> ? X: never;

const x: X = {};

export const mutate = async <N extends MutateKeys>(
	name: N,
	input: ,
	token?: string,
) => {
	const response = await fetch(`${url}/${String(name)}`, {
		method: "POST",
		headers: token ? { authorization: `Bearer ${token}` } : {},
		body: JSON.stringify(input),
	});

	return (await response.json()) as MutateRoutes[N] extends Query<
		any,
		infer X,
		any
	>
		? X
		: undefined;
};
