import styles from "./inbox.module.pcss";
import {Component, JSX} from "solid-js";

type Page = Component<{
	children: JSX.Element;
	bottom: Component;
	top?: Component;
	scrollable?: boolean;
}>;

const Page: Page = (_) => {
	const Top = _.top;
	const Bottom = _.bottom;

	return (
		<div class={styles.page}>
			{Top && <Top />}

			<div class={styles.content} data-scrollable={_.scrollable}>
				{_.children}
			</div>

			<Bottom />
		</div>
	);
};

export default Page;