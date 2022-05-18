import styles from "../../styles/typography.module.css";
import {Component} from "solid-js";

type Title = Component<{
	class?: string;
	children: string;
}>;

const Title: Title = (_) => {
	return <div class={`${styles.title} ${_.class}`}>{_.children}</div>;
};

export default Title;