import { build } from "esbuild";

build({
	entryPoints: ["src/index.ts"],
	bundle: true,
	// minify: true,
	treeShaking: true,
	packages: "external",
	format: "esm",
	platform: "node",
	target: "esnext",
	outdir: "dist",
});
