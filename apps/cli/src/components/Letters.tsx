import React from "react";
import SelectInput from "ink-select-input";
import { Item } from "ink-select-input/build/SelectInput";

type Letter = Item<number>;

const Letters: React.FC<{
	items: Letter[];
	onSelect: (letter: Letter) => void;
}> = ({ items, onSelect }) => {
	return <SelectInput items={items} onSelect={onSelect} />;
};

export default Letters;
