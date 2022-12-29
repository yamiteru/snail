import { Env } from "@snail/types";
import { describe } from "vitest";

declare global {
	function getMiniflareBindings(): Env;
	function setupMiniflareIsolatedStorage(): typeof describe;
	let bindings: Env;
}

export {};
