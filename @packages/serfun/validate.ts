import { Type, TypeOf } from "io-ts";

export function validate<T extends Type<any>>(ctx: string, definition: T, data: TypeOf<T>) {
    const res = definition.decode(data);

    if (res._tag === "Left") {
        const { context, value } = res.left[0];
        const { key, type: { name } } = context[1];

        throw new Error(`${ctx} attribute "${key}" with value "${value}" does not match type "${name}"`);
    }

    return data;
}
