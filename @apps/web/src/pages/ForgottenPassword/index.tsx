import {Component} from "solid-js";
import NavigationHomePage from "../../components/Navigation/presets/HomePage";
import Page from "../../components/Page";

const ForgottenPasswordPage: Component = () => {
	return (
		<Page bottom={NavigationHomePage}>
			Forgotten password
		</Page>
	);
};

export default ForgottenPasswordPage;