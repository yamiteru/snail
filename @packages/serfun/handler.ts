import { IncomingHttpHeaders } from "http2";
import { Type, TypeOf } from "io-ts";
import { validate } from "./validate";

export function handler<
    I extends Type<any>,
    O extends Type<any>
>(
    [input, output]: [input: I | null, output: O | null],
    callback: (params: TypeOf<I>, headers: IncomingHttpHeaders) => Promise<TypeOf<O>>
) {
    return async (params: TypeOf<I>, headers: IncomingHttpHeaders) => {
        input && validate("Input", input, params);

        const res = await callback(params, headers);

        if(output) return validate("Output", output, res);
        else return res;
    }
}