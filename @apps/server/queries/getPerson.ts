import { LoginInput } from "../api/login";
import db from "../db";

export const getPerson = (data: Pick<LoginInput, "nick">) => db
    .prepare(`SELECT * FROM person WHERE nick = '${data.nick}' LIMIT 1`)
    .get();
