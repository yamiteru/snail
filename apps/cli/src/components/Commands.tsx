import React from "react";
import { Box } from "ink";
import Command from "./Command";

const Commands: React.FC<{
	items: { name: string; description: string }[];
}> = ({ items }) => {
	return (
		<Box>
			{items.map((v) => (
				<Command {...v} />
			))}
		</Box>
	);
};

export default Commands;
