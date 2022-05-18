import {Component, For} from "solid-js";
import Page from "../components/Page";
import NavigationPersonBottom from "../components/Navigation/presets/PersonBottom";
import NavigationPersonTop from "../components/Navigation/presets/PersonTop";
import LetterCard from "../components/Letter/Card";

const CARDS = [
	{ id: "0", title: "Contrary to popular belief, Lorem Ipsum is not simply random text", nick: "yamiteru" },
	{ id: "1", date: "4. 5. 2022", title: "Contrary to popular belief, Lorem Ipsum is not simply random text", nick: "petr" },
	{ id: "2", date: "4. 5. 2022", title: "Contrary to popular belief, Lorem Ipsum is not simply random text", nick: "yamiteru" },
];

const CONTEXT = {
	nick: "petr"
};

const Person: Component = () => {
	return (
		<Page
			top={NavigationPersonTop}
			bottom={NavigationPersonBottom}
			scrollable={true}
		>
			<For each={CARDS}>
				{(data) => <LetterCard data={data} context={CONTEXT} />}
			</For>
		</Page>
	);
};

export default Person;