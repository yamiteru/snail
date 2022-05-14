import { isBetweenNumbers } from "@apps/server/predicates";
import { string, brand, Branded } from "io-ts";

interface Name {
    readonly Name: unique symbol;
}

export const Name = brand(
    string,
    (v): v is Branded<string, Name> => {
        return v.includes(" ") && isBetweenNumbers(3, 64, v.length);
    },
    "Name"
);
