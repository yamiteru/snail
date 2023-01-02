import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import { decodeJwt, verifyJwt } from "@snail/utils";
import { personRead } from "@services";

export async function createContext({ req }: { req: Request }) {
	const bearer = req.headers.get("authorization");
	const ip =
		req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip") || "0";

	if (bearer) {
		const token = bearer.slice(7);
		const email = decodeJwt(token).email as string;
		const secret = await personRead(email);

		if (secret === null) {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "User does not exist",
			});
		}

		try {
			await verifyJwt(bindings.SECRET + secret + ip, token);
		} catch {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "Token is invalid",
			});
		}

		return {
			user: { email, token },
			ip,
		};
	} else {
		return {
			user: { email: "", token: "" },
			ip,
		};
	}
}

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ next, ctx }) => {
	if (ctx.user.email === "") {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "User is not authorized",
		});
	}

	return next({ ctx });
});

export const publicRoute = t.procedure;
export const privateRoute = t.procedure.use(isAuthed);
