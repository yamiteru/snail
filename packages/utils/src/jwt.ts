import { jwtVerify, SignJWT } from "jose";
import { textEncoder } from "./constants";

export { decodeJwt } from "jose";

export const createJwt = (
	secret: string,
	payload: Record<string, unknown>,
	expiration: string,
) => {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(expiration)
		.sign(textEncoder.encode(secret));
};

export const verifyJwt = (secret: string, token: string) =>
	jwtVerify(token, textEncoder.encode(secret));
