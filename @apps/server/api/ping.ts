import { handler } from "serfun";
import { string } from "io-ts";

export const ping = handler([ null, string ], async () => "pong");
