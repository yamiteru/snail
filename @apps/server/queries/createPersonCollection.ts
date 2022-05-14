import db from "../db";

export const createPersonCollection = () => db
    .prepare(`CREATE TABLE IF NOT EXISTS person (
        nick TEXT PRIMARY KEY,
        emoji TEXT NOT NULL,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        token TEXT)`)
    .run();