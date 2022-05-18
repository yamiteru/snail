import {Component} from "solid-js";
import NavigationAuthBottom from "../components/Navigation/presets/AuthBottom";
import Page from "../components/Page";

const ErrorPage: Component = () => {
	return (
		<Page bottom={NavigationAuthBottom}>
				Error
		</Page>
	);
}

export default ErrorPage;