export const minute = 60;
export const hour = 60 * minute;
export const day = 24 * hour;
export const week = 7 * day;
export const month = 30 * day;
export const year = 365 * day;

export const personKey = (me: string) => `p:${me}`;
export const inboxKey = (me: string, otherPerson?: string, date?: string) =>
	date
		? `i:${me}:${otherPerson}:${date}`
		: otherPerson
		? `i:${me}:${otherPerson}`
		: `i:${me}`;
export const codeKey = (me: string) => `c:${me}`;
export const tokenKey = (me: string, token?: string) =>
	token ? `t:${me}:${token}` : `t:${me}`;
export const blockedKey = (me: string, otherPerson?: string) =>
	otherPerson ? `b:${me}:${otherPerson}` : `b:${me}`;

export const noopP = async () => void 0;
export const noopS = () => void 0;

export const textEncoder = new TextEncoder();
export const textDecoder = new TextDecoder();
