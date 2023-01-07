import { defineConfig } from "vitest/config";
import * as path from "path";

export default defineConfig({
	test: {
		environment: "miniflare",
		environmentOptions: {
			bindings: { SECRET: "secret" },
			kvNamespaces: ["KV"],
		},
	},
	resolve: {
		alias: {
			"@services": path.resolve(__dirname, "./src/services/index.ts"),
			"@utils": path.resolve(__dirname, "./src/utils/index.ts"),
		},
	},
});
