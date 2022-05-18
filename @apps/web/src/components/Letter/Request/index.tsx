import styles from "./index.module.css";
import {Component} from "solid-js";
import Button from "../../Button";

type LetterRequest = Component<{
	onAllow: () => void;
	onDeny: () => void;
}>;

const LetterRequest: LetterRequest = ({ onAllow, onDeny }) => {
	return (
		<div class={styles.request}>
			<Button class={styles.button} onClick={onAllow}>✅ Allow</Button>
			<Button class={styles.button} onClick={onDeny}>❌ Deny</Button>
		</div>
	);
};

export default LetterRequest;