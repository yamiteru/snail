export namespace Key {
	export const person = (me: string) => `p:${me}`;
	export const inbox = (me: string, otherPerson?: string, date?: string) =>
		date
			? `i:${me}:${otherPerson}:${date}`
			: otherPerson
			? `i:${me}:${otherPerson}`
			: `i:${me}`;
	export const code = (me: string) => `c:${me}`;
	export const token = (me: string, token?: string) =>
		token ? `t:${me}:${token}` : `t:${me}`;
	export const blacklist = (me: string, otherPerson?: string) =>
		otherPerson ? `b:${me}:${otherPerson}` : `b:${me}`;
}
