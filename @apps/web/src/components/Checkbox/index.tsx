import styles from "./index.module.css";
import {Component, Setter, Accessor} from "solid-js";
import Caption from "../Typography/Caption";

type Checkbox = Component<{
	name: string;
	children: string;
	value: Accessor<boolean>;
	setter: Setter<boolean>;
}>;

const Checkbox: Checkbox = (_) => {
	const toggle = () => _.setter((v) => !v);

	return <div class={styles.checkbox}>
		<input
			class={styles.input}
			id={_.name}
			name={_.name}
			type={"checkbox"}
		/>

		<div
			class={styles.square}
			data-active={_.value()}
			onClick={toggle}
		/>

		<div
			class={styles.label}
			onClick={toggle}
		>
			<Caption>{_.children}</Caption>
		</div>
	</div>
};

export default Checkbox;