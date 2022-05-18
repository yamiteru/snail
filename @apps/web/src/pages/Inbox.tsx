import {Component, For} from "solid-js";
import Page from "../components/Page";
import LetterCard from "../components/Letter/Card";
import NavigationMainBottom from "../components/Navigation/presets/MainBottom";

const CARDS = [
	{ id: "0", date: "4. 5. 2022", title: "Contrary to popular belief, Lorem Ipsum is not simply random text", nick: "yamiteru" },
	{ id: "1", date: "4. 5. 2022", title: "Contrary to popular belief, Lorem Ipsum is not simply random text", nick: "petr" },
	{ id: "2", date: "4. 5. 2022", title: "Contrary to popular belief, Lorem Ipsum is not simply random text", nick: "yamiteru" },
	{ id: "3", date: "4. 5. 2022", title: "Contrary to popular belief, Lorem Ipsum is not simply random text", nick: "petr" },
	{ id: "4", date: "4. 5. 2022", title: "Contrary to popular belief, Lorem Ipsum is not simply random text", nick: "yamiteru" },
];

const CONTEXT = {
	nick: "petr"
};

const InboxPage: Component = () => {
	return (
		<Page bottom={NavigationMainBottom} scrollable={true}>
			<For each={CARDS}>
				{(data, i) => (
					<LetterCard data={data} context={CONTEXT} showRequest={i() === 0} />
				)}
			</For>
		</Page>
	);
};

export default InboxPage;