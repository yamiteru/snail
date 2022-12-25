import { boolean, object, string } from "zod";
import { getPrisma, global, procedure } from "@app";
import { sendEmail, randomString } from "@utils";

export const code = procedure
  .meta({ openapi: { method: "POST", path: "/code" } })
  .input(
    object({
      email: string().email(),
    }),
  )
  .output(boolean())
  .mutation(async ({ input: { email } }) => {
    const prisma = getPrisma();
    const loginCode = randomString(6);

    await sendEmail(
      global.env.SENDGRID_TEMPLATE_LOGIN_CODE,
      { loginCode },
      email,
    );

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        loginCode,
      },
    });

    return true;
  });
