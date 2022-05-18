import styles from "../../styles/typography.module.css";
import {Component} from "solid-js";

type Heading = Component<{
	children: string;
}>;

const Heading: Heading = (_) => {
	return <div class={styles.heading}>{_.children}</div>;
};

export default Heading;