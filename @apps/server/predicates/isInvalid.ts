import { isLeft } from "fp-ts/lib/Either";
import { Branded, Type, TypeOf } from "io-ts";

export const isInvalid = <T extends Type<any>>(
    type: T,
    value: TypeOf<T> | Branded<any, TypeOf<T>>
) =>
    isLeft(type.decode(value));
