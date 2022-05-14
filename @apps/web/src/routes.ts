import {RouteDefinition} from "solid-app-router";
import LoginPage from "./pages/Login";
import {lazy} from "solid-js";
import RegisterPage from "./pages/Register";
import ForgottenPasswordPage from "./pages/ForgottenPassword";

export const routes: RouteDefinition[] = [
	{
		path: "/",
		component: LoginPage
	},
	{
		path: "/register",
		component: RegisterPage
	},
	{
		path: "/forgotten-password",
		component: ForgottenPasswordPage
	},
	{
		path: "**",
		component: lazy(() => import("./pages/Error"))
	}
];