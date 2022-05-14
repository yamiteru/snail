import { isBetweenNumbers, isInvalid } from "@apps/server/predicates";
import { string, brand, Branded } from "io-ts";
import { Ascii } from "../simple";

interface Password {
    readonly Password: unique symbol;
}

export const Password = brand(
    string,
    (v): v is Branded<string, Password> => {
        if(isInvalid(Ascii, v)) return false;
        return isBetweenNumbers(8, 16, v.length);
    },
    "Password"
);
