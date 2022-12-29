export const searchParams = <T extends Record<string, string>>(url: string) => {
	const params = new URLSearchParams(url);
	const keys = params.keys();
	const res: T = {} as never;

	for (const key of keys) {
		(res as any)[key] = params.get(key);
	}

	return res;
};
