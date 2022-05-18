import {Component} from "solid-js";
import Navigation from "../index";
import Button from "../../Button";

const NavigationReadTop: Component = () => {
	return <Navigation position={"top"} elements={[
		<Button>⬅️ Back️</Button>,
		<Button>🔥 Petr Novák</Button>,
	]} />
};

export default NavigationReadTop;