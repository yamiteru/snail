import { RegisterInput } from "../api/register";
import db from "../db";

export const checkIfPersonExists = (data: Pick<RegisterInput, "nick">) => {
    const query = `SELECT COUNT(*) as count FROM person WHERE nick = '${data.nick}' LIMIT 1`;
    const { count } = db.prepare(query).get();
    return count === 1;
}
