import styles from "./index.module.css";
import {Component, JSX} from "solid-js";

type Form = Component<{
	children: JSX.Element;
	onSubmit: () => void;
}>;

const Form: Form = (_) => {
	const onSubmit = (e: Event) => {
		e.preventDefault();
		_.onSubmit();
	};

	return (
		<form
			onSubmit={onSubmit}
			class={styles.form}
		>
			{_.children}
		</form>
	);
};

export default Form;