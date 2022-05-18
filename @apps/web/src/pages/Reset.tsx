import {Component} from "solid-js";
import NavigationAuthBottom from "../components/Navigation/presets/AuthBottom";
import Page from "../components/Page";

const ResetPage: Component = () => {
	return (
		<Page bottom={NavigationAuthBottom}>
			Forgotten password
		</Page>
	);
};

export default ResetPage;