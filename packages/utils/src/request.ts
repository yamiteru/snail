export const getHeaders = (request: Request) => {
	const headers: Record<string, string> = {};

	request.headers.forEach((key, value) => (headers[key] = value));

	return headers;
};

export const getParams = <T extends Record<string, string>>(url: string) => {
	const params = new URLSearchParams(url);
	const keys = params.keys();
	const res: T = {} as never;

	for (const key of keys) {
		(res as any)[key] = params.get(key);
	}

	return res;
};
