import db from "../db";

type Data = {
	tableName: string;
};

export const readAllInboxLetters = ({ tableName }: Data) => {
	return db.prepare(`SELECT * FROM ${tableName}`).all();
};