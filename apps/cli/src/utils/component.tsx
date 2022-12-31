import React from "react";
import { Box, render, Text } from "ink";
import Input from "../components/Input";
import Error from "../components/Error";

export const input = (name: string) =>
	new Promise<string>((resolve) => {
		render(
			<Box display={"flex"} flexDirection={"row"}>
				<Text color="green">{name}: </Text>
				<Input onResolve={resolve} />
			</Box>,
		);
	});

export const error = (error: {
	reason: string;
	context: Record<string, unknown>;
}) => {
	render(<Error {...error} />);
};
