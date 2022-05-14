import { handler } from "serfun";
import { updateToken } from "../queries";
import {getMe} from "../utils/getMe";

export const logout = handler(
    [null, null],
    async (_, headers) => {
        try {
          const { nick } = getMe(headers);

          updateToken({ nick: nick, token: null });

          return null;
        } catch {
          return null;
        }
    });