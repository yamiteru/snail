import styles from "./inbox.module.pcss";
import {Component, JSX} from "solid-js";

type Page = Component<{
	top?: Component;
	children: JSX.Element;
	bottom: Component;
}>;

const Page: Page = (_) => {
	const Top = _.top;
	const Bottom = _.bottom;

	return (
		<div class={styles.page}>
			{Top && <Top />}

			<div class={styles.content}>
				{_.children}
			</div>

			<Bottom />
		</div>
	);
};

export default Page;