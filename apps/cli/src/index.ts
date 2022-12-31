#!/usr/bin/env node

import "dotenv/config";
import { args, route } from "./utils";
import { commands } from "./commands";

(async () => {
	await ((commands as any)[route] || commands.help).handler(args);
})();
