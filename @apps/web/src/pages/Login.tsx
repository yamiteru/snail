import {Component, createMemo, createSignal} from "solid-js";
import NavigationAuthBottom from "../components/Navigation/presets/AuthBottom";
import Page from "../components/Page";
import Input from "../components/Input/input";
import Button from "../components/Button";
import Heading from "../components/Typography/Heading";
import Layout from "../components/Layout";
import {useNavigate} from "solid-app-router";
import Form from "../components/Form";
import {type} from "io-ts";
import {NonEmptyString} from "io-ts-types";
import {isLeft} from "fp-ts/Either";

const Schema = type({
	nick: NonEmptyString,
	password: NonEmptyString,
});

const LoginPage: Component = () => {
	const navigate = useNavigate();
	const [nick, setNick] = createSignal<string>("");
	const [password, setPassword] = createSignal<string>("");
	const disabled = createMemo(() => {
		return isLeft(Schema.decode({
			nick: nick(),
			password: password()
		}));
	}, true);

	return (
		<Page bottom={NavigationAuthBottom}>
			<Heading>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida placerat mauris</Heading>

			<Form onSubmit={() => navigate("/")}>
				<Layout items={[
					<Input placeholder={"Nickname"} setter={setNick} />,
					[
						<Input placeholder={"Password"} setter={setPassword} type={"password"} />,
						<Button outline={"green"} disabled={disabled()}>✅ Login</Button>
					]
				]} />
			</Form>
		</Page>
	);
};

export default LoginPage;