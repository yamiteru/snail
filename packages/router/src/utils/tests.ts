import { faker } from "@faker-js/faker";
import { Handler } from "./handler";
import { Env } from "@snail/types";

export const getRandomEmails = () =>
	[...new Array(10)].map(() => faker.internet.email());

export const getRandomNames = () =>
	[...new Array(10)].map(() => faker.name.firstName());

export const getRandomEmailTuples = () =>
	[...new Array(10)].map(() => [
		faker.internet.email(),
		faker.internet.email(),
	]);

type Options<B, P> = Partial<{
	body: B;
	params: P;
	headers: Record<string, string>;
	env: Env;
}>;

export const call = <B, P, O>(
	handler: Handler<B, P, O>,
	options: Partial<Options<B, P>>,
) =>
	handler({
		body: async () => options.body || ({} as B),
		params: () => options.params || ({} as P),
		headers: () => options.headers || {},
		env: options.env || bindings,
	});
