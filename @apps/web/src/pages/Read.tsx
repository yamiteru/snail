import {Component} from "solid-js";
import Page from "../components/Page";
import NavigationReadTop from "../components/Navigation/presets/ReadTop";
import NavigationReadBottom from "../components/Navigation/presets/ReadBottom";
import LetterRead from "../components/Letter/Read";

const Read: Component = () => {
	return (
		<Page
			top={NavigationReadTop}
			bottom={NavigationReadBottom}
			scrollable={true}
		>
			<LetterRead
				title={"Pellentesque ipsum nisl, ultrices nec eros vitae, blandit dapibus arcu feugiat auctor ipsum, eget iaculis nibh aliquam porttitor"}
				content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida placerat mauris, at suscipit elit consectetur laoreet. Suspendisse eget semper purus. Mauris lacus purus, interdum luctus consectetur at, pellentesque sit amet est. Fusce eget odio sed quam lacinia ornare. Mauris nec varius purus. Cras vehicula malesuada sapien. Donec lacinia blandit tincidunt.
Aenean auctor a ex accumsan finibus. Morbi eu justo ut est lacinia laoreet. Integer eu aliquet nibh, nec congue nunc. Nulla ac odio in sem luctus iaculis. Pellentesque id urna non orci dapibus hendrerit. Fusce et aliquet sem. Duis pharetra, metus eget tempus ornare, metus lacus vulputate odio, id laoreet urna ex in felis. In scelerisque elementum risus.`}
			/>
		</Page>
	);
};

export default Read;