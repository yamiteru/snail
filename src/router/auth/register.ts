import { boolean, object, string } from "zod";
import { sendEmail, randomString } from "@utils";
import { getPrisma, global, procedure } from "@app";

export const register = procedure
  .meta({ openapi: { method: "POST", path: "/register" } })
  .input(
    object({
      email: string().email(),
    }),
  )
  .output(boolean())
  .mutation(async ({ input: { email } }) => {
    const prisma = getPrisma();
    const user = await prisma.user.findUnique({ where: { email } });

    if (user !== null) {
      throw Error(`User with email ${email} already exists`);
    }

    const loginCode = randomString(6);

    await sendEmail(
      global.env.SENDGRID_TEMPLATE_LOGIN_CODE,
      { loginCode },
      email,
    );

    await prisma.user.create({
      data: {
        email,
        loginCode,
      },
    });

    return true;
  });
