import "dotenv/config";
import { server } from "serfun";
import * as API from "./api";
import { createPersonCollection } from "./queries";

createPersonCollection();

server(API, {
    url: process.env.URL || "/",
    port: +(process.env.PORT || 3000),
    key: process.env.KEY || "",
    cert: process.env.CERT || ""
});
