import {Component} from "solid-js";
import Navigation from "../index";
import Button from "../../Button";

const NavigationWriteTop: Component = () => {
	return <Navigation position={"top"} elements={[
		<Button>⬅️ Back️</Button>,
		<Button>Search</Button>,
	]} />
};

export default NavigationWriteTop;