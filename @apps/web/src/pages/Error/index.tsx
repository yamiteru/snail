import {Component} from "solid-js";
import NavigationHomePage from "../../components/Navigation/presets/HomePage";
import Page from "../../components/Page";

const ErrorPage: Component = () => {
	return (
		<Page bottom={NavigationHomePage}>
				Error
		</Page>
	);
}

export default ErrorPage;