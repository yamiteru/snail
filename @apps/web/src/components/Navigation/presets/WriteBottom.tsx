import {Component} from "solid-js";
import Navigation from "../index";
import Button from "../../Button";

const NavigationWriteBottom: Component = () => {
	return <Navigation
		position={"bottom"}
		elements={[
			<Button>✉️️ Send</Button>,
			<Button>💾 Save</Button>,
			<Button>🗑️ Delete️</Button>
		]}
	/>
};

export default NavigationWriteBottom;