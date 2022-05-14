import { ServerHttp2Stream } from "http2";
import { stringify } from "./stringify";

export function json(stream: ServerHttp2Stream, code: number, data: unknown) {
    stream.respond({
        "content-type": "application/json; charset=utf-8",
        ":status": code
    });
    stream.end(stringify(data, ""));
}
