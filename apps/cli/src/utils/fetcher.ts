import { fetcherFactory } from "@snail/utils";
import { AppRouter } from "@snail/router";

export const { query, mutate } = fetcherFactory<AppRouter>(
	"http://localhost:8787",
);

mutate("auth-login");
