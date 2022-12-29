export const defaultSendEmail = (
	template: string,
	data: Record<string, unknown>,
	email: string,
) => {
	const { SENDGRID_API, SENDGRID_EMAIL } = bindings;

	return fetch("https://api.sendgrid.com/v3/mail/send", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${SENDGRID_API}`,
		},
		body: JSON.stringify({
			from: {
				email: SENDGRID_EMAIL,
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

type Fn = (
	template: string,
	data: Record<string, unknown>,
	email: string,
) => Promise<Response> | Promise<unknown>;

let _fn: Fn = defaultSendEmail;

export const setSendEmail = (fn: Fn) => {
	_fn = fn;
};

export const sendEmail = (
	template: string,
	data: Record<string, unknown>,
	email: string,
) => _fn(template, data, email);
