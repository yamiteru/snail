import { DEFAULT_ERROR_STRING } from "./constants";
import { stringify } from "./stringify";

export function error(code: number, message: string) {
    throw new Error(stringify({ code, message }, DEFAULT_ERROR_STRING));
}
