export const dateKey = (date: Date = new Date()) => {
	const yy = date.getFullYear();
	const mm = `${date.getMonth()}`.padStart(2, "0");
	const dd = `${date.getDate()}`.padStart(2, "0");

	return `${yy}${mm}${dd}`;
};
