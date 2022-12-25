import "dotenv/config";
import { Env } from "@types";
import { global } from "@/app";
import crypto from "crypto";

export const setEnv = () => {
	(globalThis as any).crypto = crypto as never;
	global.env = process.env as Env;
};
