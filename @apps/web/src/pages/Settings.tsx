import {Component} from "solid-js";
import Page from "../components/Page";
import NavigationMainBottom from "../components/Navigation/presets/MainBottom";

const SettingsPage: Component = () => {
	return (
		<Page bottom={NavigationMainBottom}>
			Settings
		</Page>
	);
};

export default SettingsPage;