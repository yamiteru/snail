import {TOKEN_HEADER} from "config";
import {IncomingHttpHeaders} from "http2";
import {verify} from "njwt";
import type {Nick} from "../brands";
import {checkIfTokenMatches} from "../queries/checkIfTokenMatches";

type Token = { body: { nick: Nick } };

export const getMe = (headers: IncomingHttpHeaders) => {
	const token = headers[TOKEN_HEADER];

	if (token && typeof token === "string") {
		const result = verify(token, process.env.SECRET) as unknown as Token;

		if(result === undefined) throw new Error("Token is not a valid JWT token");

		const { nick } = result.body;

		if(!checkIfTokenMatches({ nick, token })) throw new Error("Wrong token was provided");

		return result.body;
	} else {
		throw new Error("No Token was provided");
	}
};