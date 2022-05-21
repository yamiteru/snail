import {createServer} from "http2";
import {
    HTTP_STATUS_METHOD_NOT_ALLOWED,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_NOT_IMPLEMENTED,
    HTTP_STATUS_OK
} from "config";
import { DEFAULT_ERROR_OBJECT } from "./constants";
import { body } from "./body";
import { error } from "./error";
import { handler } from "./handler";
import { json } from "./json";
import { parse } from "./parse";
import { request } from "./request";
import { validate } from "./validate";

type API = Record<string, ReturnType<typeof handler>>;
type Options = {
    url: string;
    port: number;
    key: string;
    cert: string;
};

export const server = (api: API, options: Options) => {
    createServer()
    .on("stream", async (stream, headers) => {
        try {
            const method = headers[":method"]?.toUpperCase() || null;

            if (method !== "POST") error(HTTP_STATUS_METHOD_NOT_ALLOWED, `Method "${method}" is not allowed`);

            const url_raw = headers[":path"] || "/";
            const query_index = url_raw.indexOf("?");
            const url = query_index > -1 ? url_raw.slice(0, query_index) : url_raw;

            if (url !== options.url) error(HTTP_STATUS_NOT_FOUND, `Url "${url}" was not found`);

            const [methodName, methodParams] = validate("Request", request, (await body(stream) as any));

            if (!(methodName in api)) error(HTTP_STATUS_NOT_IMPLEMENTED, `Method "${methodName}" has no implementation`);

            const response = await api[methodName](methodParams, headers);

            json(stream, HTTP_STATUS_OK, {
                data: response,
                error: null
            });
        } catch (e: any) {
            const { code, message } = parse(e.message, {
                ...DEFAULT_ERROR_OBJECT,
                message: e.message || DEFAULT_ERROR_OBJECT.message
            });

            json(stream, code, {
                data: null,
                error: message
            });
        }
    })
    .listen(options.port, () =>
        console.log(`http://localhost:${options.port}`)
    );
}