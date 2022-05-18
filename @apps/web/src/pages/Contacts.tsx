import {Component} from "solid-js";
import Page from "../components/Page";
import NavigationMainBottom from "../components/Navigation/presets/MainBottom";
import NavigationContactsTop from "../components/Navigation/presets/ContactsTop";
import ContactList from "../components/Contact/List";
import {randUser} from "@ngneat/falso";

const EMOJIS = ["😜", "🙂", "💋", "😁", "😇"];

const getEmoji = () => EMOJIS[Math.round(Math.random()*(EMOJIS.length-1))];

const WAITING = [...new Array(2)].map(() => {
	const { firstName, username, lastName } = randUser();

	return {
		nick: username.toLowerCase(),
		name: `${firstName} ${lastName}`,
		emoji: getEmoji()
	};
});

const ALLOWED = [...new Array(10)].map(() => {
	const { firstName, username, lastName } = randUser();

	return {
		nick: username.toLowerCase(),
		name: `${firstName} ${lastName}`,
		emoji: getEmoji()
	};
});

const DENIED = [...new Array(1)].map(() => {
	const { firstName, username, lastName } = randUser();

	return {
		nick: username.toLowerCase(),
		name: `${firstName} ${lastName}`,
		emoji: getEmoji()
	};
});

const ContactsPage: Component = () => {
	return (
		<Page
			top={NavigationContactsTop}
			bottom={NavigationMainBottom}
			scrollable={true}
		>
			<ContactList title={"Waiting"} people={WAITING} />
			<ContactList title={"Allowed"} people={ALLOWED} />
			<ContactList title={"Denied"} people={DENIED} />
		</Page>
	);
};

export default ContactsPage;