import { SignJWT } from "jose";

export const createJwt = (
  secret: string,
  payload: Record<string, unknown>,
  expiration: string,
) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiration)
    .sign(new TextEncoder().encode(secret));
};
