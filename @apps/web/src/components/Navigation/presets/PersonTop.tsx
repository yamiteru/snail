import {Component} from "solid-js";
import Navigation from "../index";
import Button from "../../Button";

const NavigationPersonTop: Component = () => {
	return <Navigation position={"top"} elements={[
		<Button>⬅️ Back️</Button>,
		<Button>🔥 Petr Novák</Button>,
		<Button>⬇️</Button>,
		<Button>⬆️</Button>
	]} />
};

export default NavigationPersonTop;