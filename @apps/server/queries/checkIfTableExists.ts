import db from "../db";

type Data = {
	tableName: string;
};

export const checkIfTableExists = ({ tableName }: Data) => {
	const query = `SELECT count(*) as count FROM sqlite_schema WHERE type='table' AND name='${tableName}' LIMIT 1`;
	const { count } = db.prepare(query).get();

	return count === 1;
}