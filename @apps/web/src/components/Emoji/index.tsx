import styles from "./index.module.css";
import {Component, Setter} from "solid-js";
import Input from "../Input/input";

type Emoji = Component<{
	setter: Setter<string>;
}>;

const Emoji: Emoji = (_) => {
	return <Input
		class={styles.emoji}
		placeholder={"🙂"}
		setter={_.setter}
	/>
};

export default Emoji;