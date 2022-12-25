export type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};

export type Env = {
  DATABASE_URL: string;
  SENDGRID_API: string;
  SENDGRID_EMAIL: string;
  SENDGRID_TEMPLATE_LOGIN_CODE: string;
};
