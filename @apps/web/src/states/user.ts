import {SetStoreFunction, Store} from "solid-js/store";

export type User = {
	emoji: string;
	nick: string;
	name: string;
	email: string;
};

type State = [Store<User>, SetStoreFunction<User>];

export const initialValue = (): User => {
	return {
		emoji: "",
		nick: "",
		name: "",
		email: "",
	};
};

export const setUser = ([, set]: State, user: User) => {
	set(user);
};