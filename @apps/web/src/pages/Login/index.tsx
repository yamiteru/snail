import styles from "./index.module.css";
import {Component, createSignal} from "solid-js";
import NavigationHomePage from "../../components/Navigation/presets/HomePage";
import Page from "../../components/Page";
import Input from "../../components/Input/input";
import Button from "../../components/Button";

const LoginPage: Component = () => {
	const [nick, setNick] = createSignal<string>("");
	const [password, setPassword] = createSignal<string>("");

	return (
		<Page bottom={NavigationHomePage}>
			<div class={styles.header}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida placerat mauris</div>

			<Input placeholder={"Nickname"} setter={setNick} />
			<Input placeholder={"Password"} setter={setPassword} />
			<Button color={"#6EC85F"}>✅ Login</Button>
		</Page>
	);
};

export default LoginPage;