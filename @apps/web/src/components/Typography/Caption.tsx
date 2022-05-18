import styles from "../../styles/typography.module.css";
import {Component} from "solid-js";

type Caption = Component<{
	class?: string;
	children: string;
}>;

const Caption: Caption = (_) => {
	return <div class={`${styles.caption} ${_.class}`}>{_.children}</div>;
};

export default Caption;