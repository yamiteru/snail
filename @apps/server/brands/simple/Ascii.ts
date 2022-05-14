import { brand, Branded, string } from "io-ts";

interface Ascii {
    readonly Ascii: unique symbol;
}

export const Ascii = brand(
    string,
    (v): v is Branded<string, Ascii> =>
        Buffer.from(v).toString("ascii") === v,
    "Ascii"
);
