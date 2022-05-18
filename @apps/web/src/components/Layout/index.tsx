import styles from "./index.module.css";
import {Component, For, JSX} from "solid-js";

type Layout = Component<{
	items: (JSX.Element | JSX.Element[])[];
}>;

const Layout: Layout = (_) => {
	return (
		<div class={styles.layout}>
			<div class={styles.rows}>
				<For each={_.items}>
					{(maybeItem) => (
						<div class={styles.row}>
							{Array.isArray(maybeItem)
								? (
									<For each={maybeItem}>
										{(item) => item}
									</For>
								)
								: maybeItem}
						</div>
					)}
				</For>
			</div>
		</div>
	);
};

export default Layout;