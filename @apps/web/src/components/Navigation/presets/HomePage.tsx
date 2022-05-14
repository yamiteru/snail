import {Component} from "solid-js";
import Navigation from "../index";
import NavButton from "../../NavButton";

const NavigationHomePage: Component = () => {
	return <Navigation
		position={"bottom"}
		elements={[
			<NavButton href={"/"}>🔮 Login</NavButton>,
			<NavButton href={"/register"}>🎉 Register</NavButton>,
			<NavButton href={"/forgotten-password"}>💡 Forgotten password</NavButton>,
		]}
	/>
};

export default NavigationHomePage;