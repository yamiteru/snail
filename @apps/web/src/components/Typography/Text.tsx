import styles from "../../styles/typography.module.css";
import {Component, JSX} from "solid-js";

type Text = Component<{
	children: string | JSX.Element;
}>;

const Text: Text = (_) => {
	return <div class={styles.text}>{_.children}</div>;
};

export default Text;