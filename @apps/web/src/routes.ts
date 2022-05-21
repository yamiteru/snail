import {RouteDefinition} from "solid-app-router";
import {lazy} from "solid-js";
import Inbox from "./pages/Inbox";

export const routes: RouteDefinition[] = [
	{
		path: "/",
		component: Inbox
	},
	{
		path: "/login",
		component: lazy(() => import("./pages/Login"))
	},
	{
		path: "/register",
		component: lazy(() => import("./pages/Register"))
	},
	{
		path: "/reset",
		component: lazy(() => import("./pages/Reset"))
	},
	{
		path: "/write",
		component: lazy(() => import("./pages/Write"))
	},
	{
		path: "/contacts",
		component: lazy(() => import("./pages/Contacts"))
	},
	{
		path: "/settings",
		component: lazy(() => import("./pages/Settings"))
	},
	{
		path: "/:nick/write",
		component: lazy(() => import("./pages/Write"))
	},
	{
		path: "/:nick/draft",
		component: lazy(() => import("./pages/Write"))
	},
	{
		path: "/:nick/:id",
		component: lazy(() => import("./pages/Read"))
	},
	{
		path: "/:nick",
		component: lazy(() => import("./pages/Person"))
	},
	{
		path: "**",
		component: lazy(() => import("./pages/Error"))
	}
];