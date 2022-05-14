import styles from "./inbox.module.css";
import caption from "../Typography/Caption/index.module.css";
import {Component, Setter} from "solid-js";

type Input = Component<{
	placeholder: string;
	setter: Setter<string>;
}>;

const Input: Input = (_) => {
	return <input
		class={`${styles.input} ${caption.caption}`}
		placeholder={_.placeholder}
		autocomplete={"off"}
		onChange={(e) => {
			_.setter(e.currentTarget.value);
		}}
	/>
};

export default Input;