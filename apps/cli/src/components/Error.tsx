import React from "react";
import { Box, Text } from "ink";

const Error: React.FC<{ reason: string; context: Record<string, unknown> }> = ({
	reason,
	context,
}) => {
	return (
		<Box display={"flex"} flexDirection={"column"}>
			<Box display={"flex"} flexDirection={"row"}>
				<Text color={"red"}>Error: </Text>
				<Text>{reason}</Text>
			</Box>

			<Box display={"flex"} flexDirection={"column"}>
				{context &&
					Object.keys(context).map((key) => (
						<Text key={key} color={"gray"}>{`  ${key}: ${context[key]}`}</Text>
					))}
			</Box>
		</Box>
	);
};

export default Error;
