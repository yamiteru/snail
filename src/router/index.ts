import { t } from "@app";
import { auth } from "./auth";

export const router = t.mergeRouters(auth);

export const caller = router.createCaller({} as never);

export type Router = typeof router;
