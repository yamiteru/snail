import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "miniflare",
		environmentOptions: {
			bindings: { SECRET: "secret" },
			kvNamespaces: ["KV"],
		},
	},
});