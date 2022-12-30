const minute = 60;
const hour = 60 * minute;
const day = 24 * hour;
const week = 7 * day;
const month = 30 * day;
const year = 365 * day;

export const Time = {
	minute: { seconds: minute },
	hour: { seconds: hour },
	day: { seconds: day },
	week: { seconds: week },
	month: { seconds: month },
	year: { seconds: year },
};

export const KV = {
	key: {
		person: (me: string) => `p:${me}`,
		inbox: (me: string, otherPerson?: string, date?: string) =>
			date
				? `i:${me}:${otherPerson}:${date}`
				: otherPerson
				? `i:${me}:${otherPerson}`
				: `i:${me}`,
		code: (me: string) => `c:${me}`,
		token: (me: string, token?: string) =>
			token ? `t:${me}:${token}` : `t:${me}`,
		blacklist: (me: string, otherPerson?: string) =>
			otherPerson ? `b:${me}:${otherPerson}` : `b:${me}`,
	},
};

export const noopP = async () => void 0;
export const noopS = () => void 0;

export const textEncoder = new TextEncoder();
export const textDecoder = new TextDecoder();
