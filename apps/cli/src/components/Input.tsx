import React, { useState } from "react";
import { Text, useApp, useInput } from "ink";

const Input: React.FC<{
	onResolve: (v: string) => void;
}> = ({ onResolve }) => {
	const { exit } = useApp();
	const [value, setValue] = useState("");

	useInput((input, key) => {
		if (key.return) {
			onResolve(value);
			exit();
		} else if (key.delete) {
			setValue((v) => v.slice(0, v.length - 1));
		} else if (input === " " || !!input) {
			setValue((v) => v + input);
		}
	});

	return <Text color={"white"}>{value}</Text>;
};

export default Input;
