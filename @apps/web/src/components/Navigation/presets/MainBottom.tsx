import {Component} from "solid-js";
import Navigation from "../index";
import Button from "../../Button";

const NavigationMainBottom: Component = () => {
	return <Navigation
		position={"bottom"}
		elements={[
			<Button link={"/write"}>✍ Write</Button>,
			<Button link={"/"}>📨 Inbox</Button>,
			<Button link={"/contacts"}>👨 Contacts</Button>,
			<Button link={"/settings"}>🔧 Settings</Button>,
			<Button link={"/login"}>🚪 Logout</Button>,
		]}
	/>
};

export default NavigationMainBottom;