import { KVNamespace } from "@miniflare/kv";

export type Either<L, R> = L | R;

export type Nullable<T> = Either<null, T>;

export type Maybe<T> = Either<undefined, Nullable<T>>;

export type Env = {
	KV: KVNamespace;
	SECRET: string;
	DATABASE_URL: string;
	SENDGRID_API: string;
	SENDGRID_EMAIL: string;
	SENDGRID_TEMPLATE_LOGIN_CODE: string;
};
