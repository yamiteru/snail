import { AbstractFileService } from "./file";
import { MAIN_CONFIG } from "../utils";
import { Nullable } from "@snail/types";

type MainConfig = {
	customConfig: string;
};

type CustomConfig = {
	token?: Nullable<string>;
	email?: Nullable<string>;
	lastChecked?: Nullable<string>;
	inbox?: Nullable<
		Record<
			string,
			{
				from: string;
				content: string;
				introtext: string;
				words: number;
			}
		>
	>;
	blocked?: Nullable<string[]>;
	editor?: Nullable<string>;
};

export class StoreService extends AbstractFileService {
	constructor() {
		super("store");
	}

	async readContacts() {
		return this.readDir(
			`${(await this.readMainConfig()).customConfig}/letters`,
		);
	}

	async readLetters(email: string) {
		return this.readDir(
			`${(await this.readMainConfig()).customConfig}/letters/${email}`,
		);
	}

	async createLetter(from: string, date: string, content: string) {
		return await this.writeFile(await this.getLetterPath(from, date), content);
	}

	async deleteLetter(from: string, date: string) {
		return await this.deleteFile(await this.getLetterPath(from, date));
	}

	readMainConfig() {
		return this.readJson<MainConfig>(MAIN_CONFIG);
	}

	upsertMainConfig(data: MainConfig) {
		return this.upsertJson(MAIN_CONFIG, {
			customConfig: data.customConfig ? this.getPath(data.customConfig) : null,
		});
	}

	async upsertCustomConfig(data: CustomConfig) {
		return await this.upsertJson(
			`${(await this.readMainConfig()).customConfig}/config.json`,
			data,
		);
	}

	async readCustomConfig() {
		return await this.readJson<CustomConfig>(
			`${(await this.readMainConfig()).customConfig}/config.json`,
		);
	}

	async readLetter(from: string, date: string) {
		return await this.readFile(await this.getLetterPath(from, date));
	}

	private async getLetterPath(from: string, date: string) {
		const { email } = await this.readCustomConfig();
		return `${
			(await this.readMainConfig()).customConfig
		}/letters/${from}/${date}${from === email ? ">" : "<"}`;
	}
}
