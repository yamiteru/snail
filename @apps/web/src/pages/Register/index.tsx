import {Component} from "solid-js";
import NavigationHomePage from "../../components/Navigation/presets/HomePage";
import Page from "../../components/Page";

const RegisterPage: Component = () => {
	return (
		<Page bottom={NavigationHomePage}>
			Register
		</Page>
	);
};

export default RegisterPage;