import db from "../db";
import { RegisterInput, RegisterOutput } from "../api/register";

export const createPerson = ({
    nick, emoji, name, password, token
}: Omit<RegisterInput, "password"> & RegisterOutput & { password: string }) => db
    .prepare(`INSERT INTO person
        (nick, emoji, name, password, token) VALUES
        ('${nick}', '${emoji}', '${name}', '${password}', '${token}')
    `)
    .run();