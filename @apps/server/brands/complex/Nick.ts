import { isBetweenNumbers, isInvalid } from "@apps/server/predicates";
import { string, brand, Branded } from "io-ts";
import { Ascii } from "../simple";

interface NickC {
    readonly Nick: unique symbol;
}

export type Nick = Branded<string, NickC>;

export const Nick = brand(
    string,
    (v): v is Branded<string, NickC> => {
        if(isInvalid(Ascii, v)) return false;
        return isBetweenNumbers(4, 12, v.length);
    },
    "Nick"
);