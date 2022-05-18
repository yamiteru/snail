import {Component} from "solid-js";
import Page from "../components/Page";
import NavigationWriteTop from "../components/Navigation/presets/WriteTop";
import NavigationWriteBottom from "../components/Navigation/presets/WriteBottom";

const Write: Component = () => {
	return (
		<Page
			top={NavigationWriteTop}
			bottom={NavigationWriteBottom}
			scrollable={true}
		>
			Write
		</Page>
	);
};

export default Write;