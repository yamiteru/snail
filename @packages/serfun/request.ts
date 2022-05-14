import { union, partial, tuple, string } from "io-ts";

export const request = union([
    tuple([string]),
    tuple([string, partial({})])
]);
