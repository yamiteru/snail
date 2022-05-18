import {Component, createSignal} from "solid-js";
import Navigation from "../index";
import Button from "../../Button";
import Input from "../../Input/input";

const NavigationContactsTop: Component = () => {
	const [search, setSearch] = createSignal<string>("");

	return <Navigation position={"top"} elements={[
		<Input
			emoji={"🔍"}
			placeholder={"Find person .."}
			setter={setSearch}
		/>,
		<Button>⬇️</Button>,
		<Button>⬆️</Button>
	]} />
};

export default NavigationContactsTop;