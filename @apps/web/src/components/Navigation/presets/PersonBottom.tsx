import {Component} from "solid-js";
import Navigation from "../index";
import Button from "../../Button";

const NavigationPersonBottom: Component = () => {
	return <Navigation
		position={"bottom"}
		elements={[
			<Button link={"/write"}>✍ Write</Button>,
			<Button>🌱 Rename</Button>,
			<Button>🗑️ Delete️</Button>
		]}
	/>
};

export default NavigationPersonBottom;