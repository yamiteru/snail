import db from "../db";

type Data = {
	tableName: string;
};

export const dropInboxTable = ({ tableName }: Data) => {
	db.prepare(`DROP TABLE IF EXISTS ${tableName}`).run();
};