import React from "react";
import { Box, Text } from "ink";

const Command: React.FC<{ name: string; description: string }> = ({
	name,
	description,
}) => {
	return (
		<Box width={40}>
			<Text>{name}</Text>
			<Text>{description}</Text>
		</Box>
	);
};

export default Command;
