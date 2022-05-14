import { ServerHttp2Stream } from "http2";
import { parse } from "./parse";

export function body(stream: ServerHttp2Stream) {
    const chunks: Buffer[] = [];

    return new Promise((resolve) => {
        stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on("error", () => resolve(null));
        stream.on("end", () => {
            const tmp = Buffer.concat(chunks).toString("utf8");
            resolve(tmp.length > 1 ? parse(tmp, null) : null);
        });
    });
}
