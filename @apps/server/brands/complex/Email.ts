import { isBetweenNumbers, isInvalid } from "@apps/server/predicates";
import { string, brand, Branded } from "io-ts";
import { Ascii } from "../simple";

interface Email {
    readonly Email: unique symbol;
}

const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const Email = brand(
    string,
    (v): v is Branded<string, Email> => {
        if(isInvalid(Ascii, v) || !isBetweenNumbers(5, 64, v.length)) {
            return false;
        }

        return regex.test(v);
    },
    "Email"
);
