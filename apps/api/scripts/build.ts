import { build } from "esbuild";

build({
	entryPoints: ["src/index.ts"],
	bundle: true,
	sourcemap: true,
	minify: true,
	format: "esm",
	target: "esnext",
	conditions: ["worker", "browser"],
	outdir: "dist",
	outExtension: { ".js": ".mjs" },
});
