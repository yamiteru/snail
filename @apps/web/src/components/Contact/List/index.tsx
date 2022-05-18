import styles from "./index.module.css";
import {Component, For} from "solid-js";
import Caption from "../../Typography/Caption";
import ContactItem from "../Item";
import {Person} from "../../../types";

type ContactList = Component<{
	title: string;
	people: Person[];
}>;

const ContactList: ContactList = (_) => {
	return (
		<div class={styles.list}>
			<Caption class={styles.title}>{_.title}</Caption>

			<div class={styles.items}>
				<For each={_.people}>
					{(data) => <ContactItem data={data} />}
				</For>
			</div>
		</div>
	);
};

export default ContactList;