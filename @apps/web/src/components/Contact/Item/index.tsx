import styles from "./index.module.css";
import {Component} from "solid-js";
import Title from "../../Typography/Title";
import {Link} from "solid-app-router";

type ContactItem = Component<{
	data: {
		nick: string;
		name: string;
		emoji: string;
	}
}>;

const ContactItem: ContactItem = (_) => {
	return (
		<Link class={styles.item} href={`/${_.data.nick}`}>
			<Title class={styles.title}>{`${_.data.emoji}  ${_.data.name}`}</Title>
		</Link>
	);
};

export default ContactItem;