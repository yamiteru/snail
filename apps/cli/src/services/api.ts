import { mutate, query } from "../utils/fetcher";

export const authRegister = (email: string) => mutate("auth-register", {});

export const authLogin = (email: string, loginCode: string) =>
	mutate("auth-login", { email, loginCode });

export const authCode = (email: string) => mutate("auth-code", { email });

export const blockedDelete = (email: string, token: string) =>
	mutate("person-allow", { email }, token);

export const blockedAdd = (email: string, token: string) =>
	mutate("person-block", { email }, token);

export const blockedList = (token: string) =>
	mutate("person-blocked", null, token);

export const letterList = (email: string, token: string) =>
	query("letter-list", { lol: "" }, token);

export const letterSend = (to: string, content: string, token: string) =>
	mutate("letter-send", { to, content }, token);

export const letterDelete = (to: string, date: string, token: string) =>
	mutate("letter-unsend", { to, date }, token);

export const letterRead = (from: string, date: string, token: string) =>
	query("letter-read", { from, date }, token);
