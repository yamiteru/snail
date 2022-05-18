import styles from "./inbox.module.css";
import typography from "../../styles/typography.module.css";
import {Component, Setter, Show} from "solid-js";

type Input = Component<{
	placeholder: string;
	setter: Setter<string>;
	emoji?: string;
	class?: string;
	type?: string;
}>;

const Input: Input = (_) => {
	return (
		<div class={styles.wrapper}>
			<Show when={_.emoji}>
				<div class={styles.emoji}>{_.emoji}</div>
			</Show>

			<input
				class={`${styles.input} ${typography.caption} ${_.class}`}
				data-emoji={!!_.emoji}
				placeholder={_.placeholder}
				autocomplete={"off"}
				type={_.type || "text"}
				onChange={(e) => {
					_.setter(e.currentTarget.value);
				}}
			/>
		</div>
	);
};

export default Input;