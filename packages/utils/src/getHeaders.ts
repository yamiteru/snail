export const getHeaders = (request: Request) => {
	const headers: Record<string, string> = {};

	request.headers.forEach((key, value) => (headers[key] = value));

	return headers;
};
