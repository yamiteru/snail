import { global } from "@app";

export const sendEmail = (
  template: string,
  data: Record<string, unknown>,
  email: string,
) => {
  return fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${global.env.SENDGRID_API}`,
    },
    body: JSON.stringify({
      from: {
        email: global.env.SENDGRID_EMAIL,
      },
      template_id: template,
      personalizations: [
        {
          to: [{ email }],
          dynamic_template_data: data,
        },
      ],
    }),
  });
};
