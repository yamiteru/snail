import {Component, createMemo, createSignal} from "solid-js";
import NavigationAuthBottom from "../components/Navigation/presets/AuthBottom";
import Page from "../components/Page";
import Input from "../components/Input/input";
import Button from "../components/Button";
import Heading from "../components/Typography/Heading";
import Layout from "../components/Layout";
import Checkbox from "../components/Checkbox";
import Emoji from "../components/Emoji";
import Form from "../components/Form";
import {boolean, string, type} from "io-ts";
import {isLeft} from "fp-ts/Either";
import {NonEmptyString} from "io-ts-types";

const Schema = type({
	email: NonEmptyString,
	emoji: NonEmptyString,
	nick: NonEmptyString,
	name: NonEmptyString,
	password: NonEmptyString,
});

const RegisterPage: Component = () => {
	const [email, setEmail] = createSignal<string>("");
	const [emoji, setEmoji] = createSignal<string>("");
	const [nick, setNick] = createSignal<string>("");
	const [name, setName] = createSignal<string>("");
	const [password, setPassword] = createSignal<string>("");
	const [accept, setAccept] = createSignal<boolean>(false);
	const disabled = createMemo(() => {
		return isLeft(Schema.decode({
			email: email(),
			emoji: emoji(),
			nick: nick(),
			name: name(),
			password: password(),
			accept: accept()
		})) || !accept();
	}, true);

	const onSubmit = () => {};

	return (
		<Page bottom={NavigationAuthBottom}>
			<Heading>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida placerat mauris</Heading>

			<Form onSubmit={onSubmit}>
				<Layout items={[
					<Input type={"email"} placeholder={"Email"} setter={setEmail} />,
					<Input placeholder={"Nickname"} setter={setNick} />,
					[
						<Emoji setter={setEmoji} />,
						<Input placeholder={"Name"} setter={setName} />,
					],
					[
						<Input type={"password"} placeholder={"Password"} setter={setPassword} />,
						<Button disabled={disabled()} outline={"green"}>✅ Register</Button>
					]
				]} />

				<Checkbox value={accept} setter={setAccept} name={"agree"}>
					I agree with the terms of service
				</Checkbox>
			</Form>
		</Page>
	);
};

export default RegisterPage;