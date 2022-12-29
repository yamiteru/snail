const ALPHABET =
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const randomString = (size: number) => {
	const max = ALPHABET.length - 1;

	let string = "";

	for (let i = 0; i < size; ++i) {
		string += ALPHABET[Math.round(Math.random() * max)];
	}

	return string;
};
