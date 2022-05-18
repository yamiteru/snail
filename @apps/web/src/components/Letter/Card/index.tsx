import styles from "./index.module.css";
import {Component, createMemo, Show} from "solid-js";
import Caption from "../../Typography/Caption";
import Title from "../../Typography/Title";
import LetterRequest from "../Request";
import {Link} from "solid-app-router";
import {Letter} from "../../../types";

type LetterCard = Component<{
	context: {
		nick: string;
	},
	data: Letter;
	showRequest?: boolean
}>;

const onAllow = () => () => console.log("ALLOW");
const onDeny = () => () => console.log("DENY");

const ME = {
	nick: "yamiteru"
};

const USERS = {
	yamiteru: "Miroslav Vršecký",
	petr: "Petr Novák"
};

const LetterCard: LetterCard = (_) => {
	const isDraft = createMemo(() => _.data.date === undefined);
	const link = createMemo(() => `/${_.context.nick}/${isDraft() ? "draft": _.data.id}`);

	return (
		<Link href={link()} class={styles.card} data-draft={isDraft()}>
			<Caption class={styles.date}>
				{ isDraft() ? "Draft": _.data.date as string }
			</Caption>

			<Title class={styles.title}>{_.data.title}</Title>

			<Show when={_.data.nick !== ME.nick}>
				{() => <Caption class={styles.name}>{(USERS as any)[_.data.nick]}</Caption>}
			</Show>

			<Show when={_.showRequest}>
				{() => (
					<LetterRequest onAllow={onAllow()} onDeny={onDeny()} />
				)}
			</Show>
		</Link>
	);
};

export default LetterCard;