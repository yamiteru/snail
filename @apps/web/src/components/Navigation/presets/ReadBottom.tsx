import {Component} from "solid-js";
import Navigation from "../index";
import Button from "../../Button";

const NavigationReadBottom: Component = () => {
	return <Navigation
		position={"bottom"}
		elements={[
			<Button>↩️ Reply</Button>,
			<Button>🗑️ Delete️</Button>
		]}
	/>
};

export default NavigationReadBottom;