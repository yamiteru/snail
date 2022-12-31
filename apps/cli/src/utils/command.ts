export const command = <T extends Record<string, any>>(command: {
	description: string;
	handler: (props: T) => Promise<void>;
}) => command;

export const createCommands = <
	T extends Record<
		string,
		{
			description: string;
			handler: (...args: any[]) => Promise<void>;
		}
	>,
>(
	commands: T,
) => commands;
