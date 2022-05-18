import styles from "./index.module.css";
import typography from "../../styles/typography.module.css";
import {Component, createMemo, Match, Switch} from "solid-js";
import {NavLink} from "solid-app-router";

type Button = Component<{
	children: string;
	link?: string;
	disabled?: boolean;
	class?: string;
	onClick?: () => void;
	type?: "input" | "link" | "button";
	outline?: "green" | "red";
}>;

const Button: Button = (_) => {
	const classes = createMemo(() => `${styles.button} ${typography.caption} ${_.class}`);

	return (
		<Switch fallback={(
			<button
				class={classes()}
				data-outline={_.outline}
				data-disabled={_.disabled}
				onClick={() => _.onClick?.()}
			>
				{_.children}
			</button>
		)}>
			<Match when={_.type === "input"}>
				<input
					type={"submit"}
					class={classes()}
					data-outline={_.outline}
					value={_.children}
					disabled={_.disabled === undefined ? false: _.disabled}
					onClick={() => _.onClick?.()}
				/>
			</Match>

			<Match when={_.type === "link" || _.link}>
				<NavLink
					href={_.link as string}
					class={classes()}
					activeClass={styles.active}
					data-outline={_.outline}
					data-disabled={_.disabled}
					end={_.link === "/"}
				>
					{_.children}
				</NavLink>
			</Match>
		</Switch>
	);
};

export default Button;