import styles from "./index.module.css";
import caption from "../Typography/Caption/index.module.css";
import button from "../../styles/button.module.css";
import {Component} from "solid-js";

type Button = Component<{
	color: string;
	children: string;
}>;

const Button: Button = (_) => {
	return (
		<div
			class={`${button.button} ${styles.button} ${caption.caption}`}
			style={{
				"border-color": _.color
			}}
		>
			{_.children}
		</div>
	);
};

export default Button;