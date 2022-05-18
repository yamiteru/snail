import styles from "./index.module.css";
import {Component} from "solid-js";
import Title from "../../Typography/Title";
import Text from "../../Typography/Text";

type LetterRead = Component<{
	title: string;
	content: string;
}>;

const LetterRead: LetterRead = (_) => {
	return (
		<div>
			<Title class={styles.title}>{_.title}</Title>
			<Text>{_.content}</Text>
		</div>
	);
};

export default LetterRead;