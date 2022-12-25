import { PrismaClient } from "@prisma/client";
import type { PrismaClientOptions } from "@prisma/client/runtime";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { OpenApiMeta } from "trpc-openapi";
import { Env, Subset } from "./types";

export function createContext({ req }: FetchCreateContextFnOptions) {
  return { req };
}

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.meta<OpenApiMeta>().context<Context>().create();

export const procedure = t.procedure;

export const global: { env: Env } = {
  env: null as never,
};

let _prisma: PrismaClient = null as never;

export const createPrisma = (
  opts?: Subset<PrismaClientOptions, PrismaClientOptions> | undefined,
) => {
  if (_prisma === null) {
    _prisma = new PrismaClient(opts as never);
  }

  return _prisma;
};

export const getPrisma = () => _prisma;
