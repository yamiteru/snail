import { HTTP_STATUS_INTERNAL_SERVER_ERROR } from "config";

export const DEFAULT_ERROR_OBJECT = {
    code: HTTP_STATUS_INTERNAL_SERVER_ERROR,
    message: "Something went wrong"
};

export const DEFAULT_ERROR_STRING = JSON.stringify(DEFAULT_ERROR_OBJECT);
