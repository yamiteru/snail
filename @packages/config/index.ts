import { constants } from "http2";

export const {
    HTTP_STATUS_METHOD_NOT_ALLOWED,
    HTTP_STATUS_NOT_IMPLEMENTED,
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_OK
} = constants;

export const TOKEN_HEADER = "x-token";
