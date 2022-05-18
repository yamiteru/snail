import {Component} from "solid-js";
import Navigation from "../index";
import Button from "../../Button";

const NavigationAuthBottom: Component = () => {
	return <Navigation
		position={"bottom"}
		elements={[
			<Button link={"/login"}>🔮 Login</Button>,
			<Button link={"/register"}>🎉 Register</Button>,
			<Button link={"/reset"}>💡 Forgotten password</Button>,
		]}
	/>
};

export default NavigationAuthBottom;