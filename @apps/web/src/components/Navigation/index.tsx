import styles from "./index.module.css";
import {Component, For, JSX} from "solid-js";

type Navigation = Component<{
	position: "top" | "bottom";
	elements: JSX.Element[];
}>;

const Navigation: Navigation = (props) => {
	return (
		<div class={styles.nav} data-position={props.position}>
				<For each={props.elements}>
					{(element) => element}
				</For>
		</div>
	);
};

export default Navigation;