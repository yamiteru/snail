import { Env } from "@snail/types";

declare global {
	function getMiniflareBindings(): Env;

	let bindings: Env;
}

export {};
