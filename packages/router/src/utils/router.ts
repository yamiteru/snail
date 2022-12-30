import { Handler } from "./handler";

export const createRouter = <
	T extends Record<
		string,
		Record<string, Record<string, Handler<any, any, any>>>
	>,
>(
	router: T,
) => router;
