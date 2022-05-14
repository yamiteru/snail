import { string, brand, Branded } from "io-ts";

interface Emoji {
    readonly Emoji: unique symbol;
}

const regexp = /\p{Emoji}/u;

export const Emoji = brand(
    string,
    (v): v is Branded<string, Emoji> =>
        regexp.test(v),
    "Emoji"
);