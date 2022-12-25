import { object, string } from "zod";
import { getPrisma, procedure } from "@app";
import { createJwt } from "@utils";

export const login = procedure
  .meta({ openapi: { method: "POST", path: "/login" } })
  .input(
    object({
      email: string().email(),
      loginCode: string(),
    }),
  )
  .output(
    object({
      token: string(),
    }),
  )
  .mutation(async ({ input: { email, loginCode } }) => {
    const prisma = getPrisma();
    const user = await prisma.user.findUnique({ where: { email } });

    if (user === null) {
      throw Error(`User with email ${email} does not exist`);
    }

    if (user.loginCode !== loginCode) {
      throw Error(`Login code is invalid`);
    }

    const now = new Date();
    const expiration = new Date();

    expiration.setDate(now.getDate() + 7);

    const secret = user.secret || crypto.randomUUID();
    const token = await createJwt(
      secret,
      {
        id: user.id,
        email: user.email,
      },
      "7d",
    );

    await prisma.token.deleteMany({
      where: {
        userId: user.id,
        expiration: {
          lt: now,
        },
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        secret: user.id,
        tokens: {
          create: {
            value: token,
            expiration,
          },
        },
        loginCode: null,
      },
    });

    return {
      token,
    };
  });
