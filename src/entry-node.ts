import "dotenv/config";
import crypto from "crypto";
import express from "express";
import { createOpenApiExpressMiddleware } from "trpc-openapi";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createPrisma, global } from "@app";
import { Env } from "@types";
import { router } from "@router";

globalThis.crypto = crypto as never;

(async () => {
  global.env = process.env as Env;

  createPrisma();

  express()
    .use(cors())
    .use("/api", createExpressMiddleware({ router } as never))
    .use("/openapi", createOpenApiExpressMiddleware({ router: router as any }))
    .listen(4000, () => {
      console.log("Server is running on: http://localhost:4000");
    });
})();
