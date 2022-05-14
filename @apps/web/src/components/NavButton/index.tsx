import styles from "./index.module.css";
import button from "../../styles/button.module.css";
import caption from "../Typography/Caption/index.module.css";
import {Component} from "solid-js";
import {NavLink} from "solid-app-router";

type NavButton = Component<{
	href: string;
	children: string;
}>;

const NavButton: NavButton = (props) => {
	return (
		<NavLink
			href={props.href}
			class={`${button.button} ${styles.button} ${caption.caption}`}
			activeClass={styles.active}
			end={props.href === "/"}
		>
			{props.children}
		</NavLink>
	);
};

export default NavButton;